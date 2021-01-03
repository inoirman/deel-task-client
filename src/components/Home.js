const profiles = [1,2,3,4,5,6,7,8];
const chooseProfilerHandler = (profile) => {
    localStorage.setItem('profileId', profile)
    document.location = 'contracts'
};
const renderProfiles = () => {
    return profiles.map(profile => (
        <div  className="col col-sm-3">
            <div key={profile} className="card" onClick={() => chooseProfilerHandler(profile)}>
                <div className="card-body">
                    <h2>{profile}</h2>
                </div>
            </div>
        </div>
    ));
}

function Home() {
    return (
        <div className="container">
            <h1>Choose Profile ID</h1>
            <div className="row">
                    {renderProfiles()}
            </div>
        </div>
    )
}

export default Home