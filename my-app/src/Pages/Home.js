import React from 'react';
import "../Styles/bootstrap.min.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Hidden, Typography } from "@material-ui/core";

function Home(){

        return (
            <div>
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={3000} transitionTime={500}>
                    <div>
                        <div className="site-wrapper">
                            <div className="site-wrapper-inner">
                                <div className="container" style={{color: "white", textAlign: "center"}}>
                                    <Hidden smDown> 
                                        <div style={{marginTop: "50%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h1 className="cover-heading">Tugas Besar 2 Aljabar Linear dan Geometri</h1>
                                                    <p className="lead">Aplikasi Dot Product pada Sistem Temu-balik Informasi</p>
                                                    <p className="lead">Teknik Informatika 2019</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>
                                    <Hidden mdUp> 
                                        <div style={{marginTop: "100%", marginBottom: "100%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h2 className="cover-heading">TUBES 2 ALGEO</h2>
                                                    <p className="lead">Aplikasi Dot Product pada Sistem Temu-balik Informasi</p>
                                                    <p className="lead">Teknik Informatika 2019</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="site-wrapper-aboutus">
                            <div className="site-wrapper-inner-aboutus">
                                <div className="container" style={{color: "white", textAlign: "center"}}>
                                    <Hidden smDown>   
                                        <div style={{marginTop: "50%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h1 className="cover-heading">Ingin Mengenal Pembuat Web Lebih Lanjut?</h1>
                                                    <p className="lead">Klik Untuk Mengenal Kami Lebih Lanjut</p>
                                                    <p className="lead">
                                                        <a href="/About" className="btn btn-lg hover-button">Tentang Kami</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>
                                    <Hidden mdUp>   
                                        <div style={{marginTop: "100%", marginBottom: "100%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h3 className="cover-heading">Ingin Mengenal Pembuat Web Lebih Lanjut?</h3>
                                                    <Typography variant="caption">Klik Untuk Mengenal Kami Lebih Lanjut</Typography>
                                                    <p className="lead">
                                                        <a href="/About" className="btn btn-lg hover-button">Tentang Kami</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="site-wrapper-concept">
                            <div className="site-wrapper-inner-concept">
                                <div className="container" style={{color: "white", textAlign: "center"}}>
                                    <Hidden smDown>   
                                        <div style={{marginTop: "50%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h1 className="cover-heading">Ingin Tahu Konsep Dasar Aplikasi Ini?</h1>
                                                    <p className="lead">Tekan Untuk Melihat Konsep Dasar Aplikasi</p>
                                                    <p className="lead">
                                                        <a href="/Concept" className="btn btn-lg hover-button">Tentang Kami</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>
                                    <Hidden mdUp>   
                                        <div style={{marginTop: "100%", marginBottom: "100%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h3 className="cover-heading">Ingin Tahu Konsep Dasar Aplikasi Ini?</h3>
                                                    <Typography variant="caption">Tekan Untuk Melihat Konsep Dasar Aplikasi</Typography>
                                                    <p className="lead">
                                                        <a href="/Concept" className="btn btn-lg hover-button">Konsep Aplikasi</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="site-wrapper-howtouse">
                            <div className="site-wrapper-inner-howtouse">
                                <div className="container" style={{color: "white", textAlign: "center"}}>
                                    <Hidden smDown>   
                                        <div style={{marginTop: "50%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h1 className="cover-heading">Bingung Bagaimana Menggunakan Aplikasi Ini?</h1>
                                                    <p className="lead">Tekan Untuk Melihat Panduan Penggunaan</p>
                                                    <p className="lead">
                                                        <a href="/How-to-Use" className="btn btn-lg hover-button">Panduan Aplikasi</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>
                                    <Hidden mdUp>   
                                        <div style={{marginTop: "100%", marginBottom: "100%"}}>
                                            <div className="blurred-box">
                                                <div className="elevated">
                                                    <h3 className="cover-heading">Bingung Bagaimana Menggunakan Aplikasi Ini?</h3>
                                                    <Typography variant="caption">Tekan Untuk Melihat Panduan Penggunaan</Typography>
                                                    <p className="lead">
                                                        <a href="/How-to-Use" className="btn btn-lg hover-button">Panduan Aplikasi</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Hidden>      
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        );
    
}

export default Home