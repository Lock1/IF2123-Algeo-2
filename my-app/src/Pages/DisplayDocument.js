import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import DimasPicture from '../Images/Dimas.jpg'
import { Button, Dialog, Grid, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";

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

function Display(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [nama, setNama] = React.useState(null) // Me-set data diri yang akan ditampilkan pada Dialog

    const location = useLocation();
    const { document, title } = location.state;

    console.log(document)
    for(let data in document){
        console.log(data.title)
    }

    function searchDokumen(){
        for(let data in document){
            if(data.title === title){
                return <p style={{color: "black"}}>{data.description}</p>
            }
        }
        return <p style={{color: "black"}}>haha</p>
    }
    
    
        return (
            <div>
                <div className="container">
                    {() => searchDokumen()}
                </div>
            </div>
        );
    
}

export default Display