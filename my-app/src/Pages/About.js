import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import Picture from '../Images/Photo.JPG'

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
    title: {
        marginTop: "2%",
        textAlign: "center"
    }
  });

function About(){
    var classes = useStyles();
        return (
            <div>
                <div className="container">
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: "3%"}}>
                    <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                    <div class="card-header bg-primary">BackEnd Developer</div>
                    <div class="card-body">
                        <h4 class="card-title" style={{color: "black"}}>Fadel Ananda Dotty</h4>
                        <p class="card-text" style={{color: "black"}}>K-02 / 13519146</p>
                        <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                    </div>
                    </div>
                    <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                    <div class="card-header bg-primary">FrontEnd Developer</div>
                    <div class="card-body">
                        {/*<div style={{display: "flex", justifyContent: "center"}}>
                            <img src={Picture} style={{width: "10rem", height: "11rem", marginBottom: "6%"}} alt="tes"/>
                        </div>*/}
                        <h4 class="card-title" style={{color: "black"}}>Gregorius Dimas Baskara</h4>
                        <p class="card-text" style={{color: "black"}}>K-02 / 13519190</p>
                        <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                    </div>
                    </div>
                    <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                    <div class="card-header bg-primary">BackEnd Developer</div>
                    <div class="card-body">
                        <h4 class="card-title" style={{color: "black"}}>Tanur Rizaldi Rahardjo</h4>
                        <p class="card-text" style={{color: "black"}}>K-02 / 13519214</p>
                        <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    
}

export default About