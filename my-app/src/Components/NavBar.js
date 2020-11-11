// import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import "../Styles/bootstrap.min.css"
function navBar(){
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style={{display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#444444"}}>
                <div>
                    <a class="navbar-brand" href="/">JONG JAVA</a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor02">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a className="nav-link" href="/Home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a className="nav-link" href="/About">About</a>
                    </li>
                    <li class="nav-item">
                        <a className="nav-link" href="/How-to-Use">How To Use</a>
                    </li>
                    <li class="nav-item">
                        <a className="nav-link" href="/Search-Engine">Search Engine</a>
                    </li>
                  </ul>
                </div>
            </nav>                                    
        </div>
    )
}
export default navBar;