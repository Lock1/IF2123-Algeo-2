import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import DimasPicture from '../Images/Dimas.jpg'
import { Button, Dialog, Grid, Typography } from "@material-ui/core";
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
    descButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    dialogText: {
        color: "white",
        marginLeft: "5%"
    },
    dialogTitle: {
        color: "white",
    },
    dialogTextTitle: {
        color: "#18bc9c",
        fontSize: "1.1em"
    },
    paper: { minWidth: "38%" },
  });

function HowtoUse(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [nama, setNama] = React.useState(null) // Me-set data diri yang akan ditampilkan pada Dialog
    const data = {
        tanur: {
            nama: "Tanur Rizaldi Rahardjo",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "ITB Jazz & ITB Student Orchestra",
            kesibukan: "Web Development Intern Startup",
            image: DimasPicture
        },
        dimas: {
            nama: "Gregorius Dimas Baskara",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "ITB Jazz & ITB Student Orchestra",
            kesibukan: "Web Development Intern Startup",
            image: DimasPicture
        },
        fadel: {
            nama: "Fadel Ananda Dotty",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "ITB Jazz & ITB Student Orchestra",
            kesibukan: "Web Development Intern Startup",
            image: DimasPicture
        },
    }

    function HandleOpenDialog(nama){
        setNama(nama)
        setOpen(true)
    }
      
    function handleCloseDialog(){
        setOpen(false)
    }
    
        return (
            <div>
                <div className="container">
                    <div style={{height:"30em"}}>
                        <Carousel showThumbs={false} showStatus={false}>
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
                                            <div style={{marginTop: "50%"}}>
                                                <div class="blurred-box">
                                                    <div class="elevated">
                                                        <h1 class="cover-heading">Panduan Penggunaan Aplikasi</h1>
                                                        <p class="lead">(Application Manual / How To Use)</p>
                                                        <p class="lead" style={{fontSize: "1em"}}>
                                                            Scroll Untuk Melihat Lebih Lanjut
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                <img src="http://bit.ly/2gPLxZ4" alt="error"/>
                                <p className="legend">Legend 3</p>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        );
    
}

export default HowtoUse