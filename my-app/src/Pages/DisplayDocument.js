import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
    link: {
        "&:focus, &:hover": {
            textDecoration: "none",
            color: "white"
        },
        color: "white" 
      },
  });

function Display(){
    const classes = useStyles();

    const location = useLocation();
    const { document } = location.state;

    console.log(document)
    
        return (
            <div>
                <div className="container">
                    <h2 style={{textAlign: "center", marginTop:"2%", marginBottom: "4%"}}>{document.title.toUpperCase()}</h2>
                    <Typography>{document.value}</Typography>
                    <Button variant="contained" color="primary" style={{marginTop:"2%"}}><a href="/Search-Engine" className={classes.link}>Kembali Ke Search Engine</a></Button>
                </div>
            </div>
        );
    
}

export default Display