import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import SearchEngine from "../Pages/SearchEngine";
import HowtoUse from "../Pages/HowtoUse";
import Display from "../Pages/DisplayDocument";
import Concept from "../Pages/Concept";


const Section = () =>{

  return(
    <section>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/Concept" component={Concept}/>
        <Route exact path="/How-to-Use" component={HowtoUse}/>
        <Route exact path="/Search-Engine" component={SearchEngine}/>
        <Route exact path="/Display-Dokumen" component={Display}/>
      </Switch>
    </section>
  )
}

export default Section
