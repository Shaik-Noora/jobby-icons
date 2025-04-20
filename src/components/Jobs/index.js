import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    userProfile: {},
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getUserProfile()
  }

  getJobs = async () => {
    const url = 'https://apis.ccbp.in/jobs'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobsData: updatedData})
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const profileOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userProfileResp = await fetch(profileUrl, profileOptions)
    const userProfileData = await userProfileResp.json()
    const updatedUP = {
      name: userProfileData.profile_details.name,
      shortBio: userProfileData.profile_details.short_bio,
      profileImageUrl: userProfileData.profile_details.profile_image_url,
    }
    if (userProfileResp.ok === true) {
      this.setState({
        userProfile: updatedUP,
        showLoader: false,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (userProfileResp.status === 401) {
      this.state({apiStatus: apiStatusConstants.failure})
    }
  }

  retryBtn = () => {
    this.getUserProfile()
  }

  renderBtn = () => (
    <button onClick={this.retryBtn} className="btnn">
      Retry
    </button>
  )

  successUserProfile = () => {
    const {userProfile} = this.state
    const {name, profileImageUrl, shortBio} = userProfile
    return (
      <div className="user-card">
        <img src={profileImageUrl} alt="user profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successUserProfile()
      case apiStatusConstants.failure:
        return this.renderBtn()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSearch = () => (
    <button type="button" data-testid="searchButton">
      <BsSearch className="search-icon" />
    </button>
  )

  render() {
    const {showLoader, jobsData} = this.state
    return (
      <div className="contt">
        {this.renderUserProfile()}
        <ul className="lis">
          {jobsData.map(each => (
            <JobItem data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Jobs
