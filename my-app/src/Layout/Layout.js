import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Section from "./Section.js"
//import Footer from "../Components/Footer"
import "../Styles/bootstrap.min.css"

function Layout(props){

    return (
        <div>
            <Router>        
                <NavBar/>
                <div style={{}}>
                    <Section/>
                </div>
                {/*<Footer/>*/}
            </Router>
        </div>
    );
}

export default Layout;