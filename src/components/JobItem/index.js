import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work'; 

import './index.css'

const JobItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data
  return (
    <li className="job-card">
      <img src={companyLogoUrl} />
      <h1>{title}</h1>
      <p>{rating}</p>
      <PlaceIcon />
      <p>{location}</p>
      <WorkIcon />
      <p>{employmentType}</p>
      <p>{packagePerAnnum}</p>
      <hr />
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}

export default JobItem
