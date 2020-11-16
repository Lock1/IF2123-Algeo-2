import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper, Hidden } from "@material-ui/core";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import StepConnector from '@material-ui/core/StepConnector';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import TableChartIcon from '@material-ui/icons/TableChart';
import Instruction_1 from '../Images/Instruction_1.JPG';
import Instruction_2 from '../Images/Instruction_2.JPG';
import Instruction_3 from '../Images/Instruction_3.JPG';
import Instruction_4 from '../Images/Instruction_4.JPG';
import Instruction_5 from '../Images/Instruction_5.JPG';
import Instruction_6 from '../Images/Instruction_6.JPG';
  
const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(44, 62, 80) 0%,rgb(24, 188, 156) 50%,rgb(52, 152, 219) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(44, 62, 80) 0%,rgb(24, 188, 156) 50%,rgb(52, 152, 219) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
})(StepConnector);
  
const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(44, 62, 80) 0%, rgb(24, 188, 156) 50%, rgb(52, 152, 219) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(44, 62, 80) 0%, rgb(24, 188, 156) 50%, rgb(52, 152, 219) 100%)',
    },
});
  
function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <SettingsIcon />,
      2: <PublishIcon />,
      3: <SearchIcon />,
      4: <TableChartIcon/>,
      5: <ExpandMoreIcon />,
      6: <FindInPageIcon />
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
}
  
ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    link: {
      "&:focus, &:hover": {
          textDecoration: "none",
          color: "white"
      },
      color: "white" 
    },
}));
  
function getSteps() {
    return ['Klik Search Engine', 'Upload File txt/html (Opsional)', 'Masukkan Query dan Tekan Search', 'Tekan Tombol Table Untuk Melihat Tabel Terms', 'Klik Dropdown Untuk Melihat Detail', 'Klik Nama Dokumen Untuk Melihat Isi Dokumen'];
}
  
function getStepContent(step) {
    switch (step) {
      case 0:
        return (
            <div>
                <Paper variant="outlined" style={{display: "flex", justifyContent: "center", padding: "2%"}}>
                    <img src={Instruction_1} alt="error"/>
                </Paper>
                <Typography style={{marginTop: "2%"}}>Klik 'Search Engine' Pada Navigation Bar yang Terletak di Bagian Atas Web</Typography>
            </div>
        )
      case 1:
        return (
            <div>
                <Paper variant="outlined" style={{display: "flex", justifyContent: "center", padding: "2%"}}>
                    <img src={Instruction_2} alt="error"/>
                </Paper>
                <Typography style={{marginTop: "2%"}}>Lakukan Upload Dokumen dalam format .txt atau .html</Typography>
            </div>
        )
      case 2:
        return (
            <div>
                <Paper variant="outlined" style={{display: "flex", flexDirection: "row", justifyContent: "center", padding: "2%"}}>
                    <img src={Instruction_3} alt="error"/>
                </Paper>
                <Typography style={{marginTop: "2%"}}>Masukkan Query Pada Kotak yang Tersedia, kemudian Tekan 'Search'</Typography>
            </div>
        )
      case 3:
        return (
            <div>
                <Paper variant="outlined" style={{display: "flex", flexDirection: "row", justifyContent: "center", padding: "2%"}}>
                    <img src={Instruction_4} alt="error"/>
                </Paper>
                <Typography style={{marginTop: "2%"}}>Setelah Memasukkan Query dan Menekan 'Search', Maka Tabel Terms Dapat Dilihat Dengan Menekan Tombol Di atas</Typography>
            </div>
        )
      case 4:
        return (
            <div>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", padding: "2%"}}>
                    <img src={Instruction_5} alt="error"/>
                </div>
                <Typography style={{marginTop: "2%"}}>Tekan Tombol Dropdown Untuk Melihat Detail/Rincian Dokumen dan Algoritma Search</Typography>
            </div>
        )
      case 5:
        return (
            <div>
                <Paper variant="outlined" style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src={Instruction_6} alt="error"/>
                </Paper>
                <Typography style={{marginTop: "2%", textAlign: "center"}}>Tekan Nama Dokumen Untuk Melihat Isi Dokumen</Typography>
            </div>
        )
      default:
        return 'Unknown step';
    }
}

function HowtoUse(){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

        return (
            <div>
                <div className="container">
                    <Hidden smDown>
                      <h2 style={{marginTop: "3%", textAlign: "center", marginBottom: "2%"}}>PANDUAN PENGGUNAAN APLIKASI</h2>
                    </Hidden>
                    <Hidden mdUp>
                      <h2 style={{marginTop: "3%", textAlign: "center", marginBottom: "2%"}}>PANDUAN APLIKASI</h2>
                    </Hidden>
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}><Hidden smDown>{label}</Hidden></StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Typography className={classes.instructions}>
                            Semua Langkah Telah Terselesaikan! Selamat Menggunakan!
                            </Typography>
                            <div>
                                <Button onClick={handleReset} className={classes.button}>
                                Reset
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    <a href="/Search-Engine" className={classes.link}>Search Engine</a>
                                </Button>
                            </div>
                        </div>
                        ) : (
                        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                            <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        );
    
}

export default HowtoUse