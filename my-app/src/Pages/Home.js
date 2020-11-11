import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import Picture from '../Images/HomeBackground.jpg'

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

function Home(){
    var classes = useStyles();
        return (
            <div>
                <div class="body_home">
                <div class="site-wrapper">
                    <div class="site-wrapper-inner">
                        <div class="container" style={{color: "white", textAlign: "center"}}>    
                            {/*<div class="masthead clearfix">
                                <div class="container-inner">
                                    {/*<nav>
                                        <ul class="nav masthead-nav">
                                            <li class="active"><a href="/">Home</a></li>
                                            <li><a href="/">Features</a></li>
                                            <li><a href="/">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>*/}
                            <div class="inner cover">
                                <div class="blurred-box">
                                    <div class="elevated">
                                        <h1 class="cover-heading">Tugas Besar 2 Aljabar Linear dan Geometri</h1>
                                        <p class="lead">Aplikasi Dot Product pada Sistem Temu-balik Informasi</p>
                                        <p class="lead">
                                            <a href="/About" class="btn btn-lg hover-button">Tentang Kami</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*
                <div className="container">
                    <h1 className={classes.title}>JUDUL</h1>
                    <input type="file"/>
                </div>*/}
                </div>
            </div>
        );
    
}

export default Home