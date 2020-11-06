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
    
    const [file, setFile] = React.useState("")
    const sB = React.createRef(null)
    const fileInput = React.createRef(null)
    var stringFile = file
    var rText = file.replace(/(,|\.|\/|\\|\"|\'|\-|\:|\(|\)|\*)/gi," ")
    
    function dbg(obj) {
        for (var i in obj) {
            alert(obj[i].value)
        }
        alert(rText)
    }

    function getDocumentDatabase() {
        // Get from firebase and save to data
        axios.get(`https://tubes-algeo-02.firebaseio.com/document.json`)
        .then(res => {
            let temp = res.data
            console.log(temp) // DEBUG
            setData(temp)
        })
    }

    // function get tlist

    function uploadFileToFirebase(){
        // TODO process to tlist
        const newDocument = {
            title: document.getElementById("fileUpload").value.substring(12),
            value: stringFile
        }
        axios.post(`https://tubes-algeo-02.firebaseio.com/document.json`, newDocument)
        alert("posted")
    }


    function setQueryText(e){
        setText(e.target.value)
    }

    function writeQuery(e){
        setQuery("Query: ".concat(text))
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        fileInput.current.files[0].text().then((fileContent) => {
            setFile(fileContent)
        }).catch((err) => {console.log(err)})
    }
    
    // DEBUG
    function altex() {
        alert(stringFile)
    }
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
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <input type="file" id="fileUpload" ref={fileInput} accept=".txt"/>
                    <button type="submit" ref={sB}>Upload</button>
                </form>
                <button type="button" onClick={() => altex()}>Cek</button>
                <button type="button" onClick={() => uploadFileToFirebase()}>Firebase</button>
                <button type="button" onClick={() => getDocumentDatabase()}>Get Firebase</button>
                <button type="button" onClick={() => dbg(data)}>Trav</button>
                <h5>{query}</h5>
            </div>
        </div>
    );
}

export default SearchEngine