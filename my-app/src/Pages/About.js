import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import DimasPicture from '../Images/Dimas.jpg'
import FadelPicture from '../Images/Fadel.jpg'
import TanurPicture from '../Images/Tanur.jpg'
import { Button, Dialog, Grid, Typography } from "@material-ui/core";

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
        textAlign: "center"
    },
    descButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    dialogText: {
        color: "white",
        marginBottom: "5%"
    },
    dialogTitle: {
        color: "white",
    },
    dialogTextTitle: {
        color: "#18bc9c",
        paddingTop: "20%"
    },
  });

function About(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [nama, setNama] = React.useState(null) // Me-set data diri yang akan ditampilkan pada Dialog
    const data = {
        tanur: {
            nama: "Tanur Rizaldi Rahardjo",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "Percama ITB, Bermain OSU (Wibu)",
            image: TanurPicture
        },
        dimas: {
            nama: "Gregorius Dimas Baskara",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "ITB Jazz & ITB Student Orchestra, Web Development Intern Startup",
            image: DimasPicture
        },
        fadel: {
            nama: "Fadel Ananda Dotty",
            jurusan: "Teknik Informatika",
            institusi: "Institut Teknologi Bandung",
            hobi: "Bermain Musik dan Rebahan",
            unit: "ITB Jazz, Intern Eksternal KM ITB",
            image: FadelPicture
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
                    <Dialog
                        open={open}
                        onClose={handleCloseDialog}
                        aria-labelledby="responsive-dialog-title"
                        classes={{ paper: classes.paper}}
                        maxWidth="xs"
                        fullWidth
                    >
                        <div style={{backgroundColor: "black"}}>
                            <div class="card mb-3" style={{backgroundColor: "#1b1e21"}}>
                                <div >
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <div style={{marginTop: "5%"}}>
                                            {(nama !== null) ?
                                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                                    <img src={data[nama].image} alt="error" style={{opacity: 0.8, width: "12em", height: "12em", objectFit: "cover", borderRadius: "100%"}}/>
                                                </div>
                                                :
                                                null
                                            }
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    {(nama !== null) ?
                                                        <div style={{marginLeft: "15%", marginRight: "15%"}}>
                                                            <hr style={{backgroundColor: "white", marginBlockStart: "0.8em", marginTop: "10%"}}></hr>
                                                            <Typography variant="subtitle-1" className={classes.dialogTextTitle}>Nama</Typography>
                                                            <Typography variant="h6" className={classes.dialogText}>{data[nama].nama}</Typography>
                                                            <Typography variant="subtitle-1" className={classes.dialogTextTitle}>Jurusan</Typography>
                                                            <Typography variant="h6" className={classes.dialogText}>{data[nama].jurusan}</Typography>
                                                            <Typography variant="subtitle-1" className={classes.dialogTextTitle}>Institusi</Typography>
                                                            <Typography variant="h6" className={classes.dialogText}>{data[nama].institusi}</Typography>
                                                            <Typography variant="subtitle-1" className={classes.dialogTextTitle}>Kesibukan</Typography>
                                                            <Typography variant="h6" className={classes.dialogText}>{data[nama].unit}</Typography>
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                </div>                                                       
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                     
                    </Dialog>                  
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: "3%"}}>
                        <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                        <div class="card-header bg-primary">Web Developer</div>
                        <div class="card-body">
                            <h4 class="card-title" style={{color: "black"}}>Fadel Ananda Dotty</h4>
                            <p class="card-text" style={{color: "black"}}>K-02 / 13519146</p>
                            <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                            <div className={classes.descButton}>
                                <Button onClick={() => HandleOpenDialog("fadel")}>Deskripsi Lebih Lanjut</Button>
                            </div>
                        </div>
                    </div>
                    <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                        <div class="card-header bg-primary">Web Developer</div>
                        <div class="card-body">
                            {/*<div style={{display: "flex", justifyContent: "center"}}>
                                <img src={Picture} style={{width: "10rem", height: "11rem", marginBottom: "6%"}} alt="tes"/>
                            </div>*/}
                            <h4 class="card-title" style={{color: "black"}}>Gregorius Dimas Baskara</h4>
                            <p class="card-text" style={{color: "black"}}>K-02 / 13519190</p>
                            <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                            <div className={classes.descButton}>
                                <Button onClick={() => HandleOpenDialog("dimas")}>Deskripsi Lebih Lanjut</Button>
                            </div>
                        </div>
                    </div>
                    <div class="card text-white mb-3" style={{maxWidth: "20rem"}}>
                        <div class="card-header bg-primary">Web Developer</div>
                        <div class="card-body">
                            <h4 class="card-title" style={{color: "black"}}>Tanur Rizaldi Rahardjo</h4>
                            <p class="card-text" style={{color: "black"}}>K-02 / 13519214</p>
                            <p class="card-text" style={{color: "black"}}>Mahasiswa Teknik Informatika Semester 3 Institut Teknologi Bandung</p>
                            <div className={classes.descButton}>
                                <Button onClick={() => HandleOpenDialog("tanur")}>Deskripsi Lebih Lanjut</Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default About