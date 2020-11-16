import "../Styles/bootstrap.min.css"
function navBar(){
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div>
                    <a className="navbar-brand" href="/">JONG JAVA</a>
                </div>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/About">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Concept">App Concept</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/How-to-Use">How To Use</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Search-Engine">Search Engine</a>
                        </li>                    
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default navBar;
