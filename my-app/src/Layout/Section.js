import React from "react";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import SearchEngine from "../Pages/SearchEngine"
import HowtoUse from "../Pages/HowtoUse"


const Section = () =>{

  return(    
    <section>
      <Switch>
        <Route exact path="/Home" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/How-to-Use" component={HowtoUse}/>
        <Route exact path="/Search-Engine" component={SearchEngine}/>
      </Switch>
    </section>
  )
}

export default Section