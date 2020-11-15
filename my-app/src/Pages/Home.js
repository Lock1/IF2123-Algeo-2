import React from 'react';
import "../Styles/bootstrap.min.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Home(){

        return (
            <div>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
                    <div>
                        <div class="site-wrapper">
                            <div class="site-wrapper-inner">
                                <div class="container" style={{color: "white", textAlign: "center"}}>    
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
                    <div>
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
                    <div>
                        <div class="site-wrapper-concept">
                            <div class="site-wrapper-inner-concept">
                                <div class="container" style={{color: "white", textAlign: "center"}}>    
                                    <div style={{marginTop: "42%"}}>
                                        <div class="blurred-box">
                                            <div class="elevated">
                                                <h1 class="cover-heading">Ingin Tahu Konsep Dasar Aplikasi Ini?</h1>
                                                <p class="lead">Tekan Untuk Melihat Konsep Dasar Aplikasi</p>
                                                <p class="lead">
                                                    <a href="/Concept" class="btn btn-lg hover-button">Konsep Aplikasi</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="site-wrapper-howtouse">
                            <div class="site-wrapper-inner-howtouse">
                                <div class="container" style={{color: "white", textAlign: "center"}}>    
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
            </div>
        );
    
}

export default Home