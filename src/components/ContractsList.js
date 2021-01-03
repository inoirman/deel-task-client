import React, {useState, useEffect} from 'react';
import axios from "axios";

function ContractsList() {
    const profileId = localStorage.getItem('profileId');


    const [contracts, setContracts]  = useState([])

    useEffect(() => {

        axios('http://localhost:3001/contracts', {
            method: 'GET',
            headers: {
                'profile_id': profileId
            },
        })
            .then(result => {
                setContracts( result.data)
            })
    }, [])

    const contractsRender = () => {
        return contracts.map( contract => (
            <div key={contract.id}  className="col col-sm-6">
                <div className="card" >
                    <div className="card-body">
                        <h2>{contract.terms}</h2>
                        <p>Contract ID: {contract.id}</p>
                        <p>Status: {contract.status}</p>
                        <p>Contract Client: {contract.ClientId}</p>
                        <p>Contract Contractor: {contract.ContractorId}</p>
                    </div>
                </div>
            </div>
        ) )
    }

    return (
        <div className="container">
            <h2>Profile {profileId}</h2>
            <div className="row">
                {contractsRender()}
            </div>
        </div>
    )
}

export default ContractsList