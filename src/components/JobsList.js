import React, {useState, useEffect} from 'react';
import axios from "axios";

function JobsList() {
    const profileId = localStorage.getItem('profileId');
    const [jobs, setJobs]  = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const getJobs = () => {
        axios('http://localhost:3001/jobs/unpaid', {
            method: 'GET',
            headers: {
                'profile_id': profileId
            },
        })
            .then(result => {
                setJobs( result.data)
            })
    }

    useEffect(() => {
        getJobs()
    }, [])

    const jobPaymentsHandler = (id) => {
        axios(
            `http://localhost:3001/jobs/${id}/pay`,
            {
                method: 'PUT',
                headers: {
                    'profile_id': profileId
                }
            }
        )
            .then(result => {
            if (result.data.err) {
                setErrorMessage(result.data.err);
                setTimeout(() => setErrorMessage(null), 3000)
            } else {
                setSuccessMessage('Payment successfully sent');
                setTimeout(() => {
                    setSuccessMessage(null);
                    getJobs();
                }, 3000)
            }
        })
            .catch(err => {
                console.log(err)
            })

        getJobs()
    }

    const jobsRender = () => {
        return jobs.map( job => (
            <div key={job.id}  className="col col-sm-6">
                <div className="card" >
                    <div className="card-body">
                        <h2>{job.description}</h2>
                        <p>Price: {job.price}</p>
                        <p>Contract ID {job.ContractId}</p>
                        <p>Contract terms: {job.Contract.terms}</p>
                        <p>Contract Client: {job.Contract.ClientId}</p>
                        <p>Contract Contractor: {job.Contract.ContractorId}</p>
                        {
                            (job.Contract.ClientId.toString() === profileId.toString()) ?
                                <button
                                    className="btn btn-primary"
                                    onClick={() => jobPaymentsHandler(job.id)}
                                >Make Payment
                                </button>
                                : null
                        }

                    </div>
                </div>
            </div>
        ) )
    }

    return (
        <div className="container">
            <h2>Profile {profileId}</h2>
            {
                (errorMessage) ?
                    <div className="alert alert-danger" role="alert">
                        {errorMessage} &nbsp;&nbsp;
                        <span className="spinner-border spinner-border-sm" role="status"
                                             aria-hidden="true"/>
                    </div>
                    : null
            }
            {
                (successMessage) ?
                    <div className="alert alert-success" role="success">
                        {successMessage} &nbsp;&nbsp;
                        <span className="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"/>
                    </div>
                    : null
            }
            <div className="row">
                {jobsRender()}
            </div>
        </div>
    )
}

export default JobsList;