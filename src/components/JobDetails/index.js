import {Component} from 'react'

class Component extends JobDetails{
    
    componentDidMount(){
        this.getJobDetails())
    }
    getJobDetails=async(props)=>{
        const {history}=props
        const {params}=history
        const {id}=params
        const url=`https://apis.ccbp.in/jobs/${id}`
        const options={
            method:'GET'
        }

        const JDResponse=await fetch(url,options)
        const JDData=await JDResponse.json()
        const updatedJD={
  jobDetails: {
    id: JDData.job_details.id,
    title: JDData.job_details.title,
    companyLogoUrl: JDData.job_details.company_logo_url,
    companyWebsiteUrl: JDData.job_details.company_website_url,
    employmentType: JDData.job_details.employment_type,
    jobDescription: JDData.job_details.job_description,
    location: JDData.job_details.location,
    packagePerAnnum: JDData.job_details.package_per_annum,
    rating: JDData.job_details.rating,
    skills: JDData.job_details.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    })),
    lifeAtCompany: {
      description: JDData.job_details.life_at_company.description,
      imageUrl: JDData.job_details.life_at_company.image_url,
    },
  },
  similarJobs: JDData.similar_jobs.map(job => ({
    id: job.id,
    title: job.title || "Job Title", // fallback
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    location: job.location,
    rating: job.rating,
    jobDescription: job.job_description,
  })),
};
    }
    
    render(){
        return(
            <>

            </>
        )
    }
}

export default JobDetails