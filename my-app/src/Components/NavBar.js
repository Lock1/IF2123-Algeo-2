import React from 'react';
import "../Styles/bootstrap.min.css"
function NavBar(){

    const [showNav, setShowNav] = React.useState(false)

    function toggleNav() {
        setShowNav(!showNav)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div>
                    <a className="navbar-brand" href="/">JONG JAVA</a>
                </div>
                <button className="navbar-toggler collapsed" type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={(showNav ? 'show' : '') + ' collapse navbar-collapse'}>
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
export default NavBar;
