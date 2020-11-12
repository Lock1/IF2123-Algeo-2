import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import Picture from '../Images/atlantis_nebula_14-wallpaper-2560x1440.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
    },
    pictureOne: {
        height: "120%",
        opacity: 0.3,
        objectFit: "cover",
        position: "fixed"  
    },
    coba: {
        height: "50%"
    }
  });

function Home(){

    

    var classes = useStyles();

        return (
            <div>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
                    <div className={classes.coba}>
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
                                                <p class="lead">Teknik Informatika 2019</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.coba}>
                        <div class="site-wrapper-aboutus">
                            <div class="site-wrapper-inner-aboutus">
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
                                    <div style={{marginTop: "42%"}}>
                                        <div class="blurred-box">
                                            <div class="elevated">
                                                <h1 class="cover-heading">Ingin Mengenal Pembuat Web Lebih Lanjut?</h1>
                                                <p class="lead">Klik Untuk Mengenal Kami Lebih Lanjut</p>
                                                <p class="lead">
                                                    <a href="/About" class="btn btn-lg hover-button">Tentang Kami</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.coba}>
                        <div class="site-wrapper-howtouse">
                            <div class="site-wrapper-inner-howtouse">
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
                                    <div style={{marginTop: "42%"}}>
                                        <div class="blurred-box">
                                            <div class="elevated">
                                                <h1 class="cover-heading">Bingung Bagaimana Menggunakan Aplikasi Ini?</h1>
                                                <p class="lead">Tekan Untuk Melihat Panduan Penggunaan</p>
                                                <p class="lead">
                                                    <a href="/How-to-Use" class="btn btn-lg hover-button">Panduan Aplikasi</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
                {/*<div class="body_home">
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
                            </div>*
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
                
                <div className="container">
                    <h1 className={classes.title}>JUDUL</h1>
                    <input type="file"/>
                </div>
                </div>*/}
            </div>
        );
    
}

export default Home