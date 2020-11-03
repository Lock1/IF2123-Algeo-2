import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import Picture from '../Images/HomeBackground.jpg'
import axios from 'axios'

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

function SearchEngine(){
    const [data, setData] = React.useState(null)
    const [text, setText] = React.useState("")
    const [query, setQuery] = React.useState("")

    axios.get(`https://tubes-algeo-02.firebaseio.com/document.json`)
    .then(res => {
        let tampung = res.data
        console.log(tampung)
        setData(tampung)
    })


    function setQueryText(e){
        setText(e.target.value)
    }

    function writeQuery(e){
        setQuery("Query: ".concat(text))
    }

    var splitText=text.split(" ")
    console.log(splitText)

    //fungsi yang mencari query di database
    //fungsi yang nge split dokumen terus ditaruh term database

    var classes = useStyles();
        return (
            <div>
                <div className="container">
                    <h1 className={classes.title}>JUDUL</h1>
                    <input type="text" onChange={(e) => setQueryText(e)}/>
                    <button type="button" class="btn btn-primary" onClick={(e) => writeQuery(e)}>Search</button>
                    <div></div>
                    <input type="file"/>
                    <h5>{query}</h5>
                </div>
            </div>
        );
    
}

export default SearchEngine