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
    const [database, setDatabase] = React.useState(null)
    const [searchtext, setSearchText] = React.useState("")
    const [query, setQuery] = React.useState("")
    const [file, setFile] = React.useState("")
    
    const uploadSubmitButton = React.createRef(null)
    const fileInput = React.createRef(null)
    var stringFile = file
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fileInput.current.files[0].text().then((fileContent) => {
            setFile(fileContent)
        }).catch((err) => { console.log(err) })
    }
    
    function dbg(obj) {
        // Traverse object
        for (var i in obj) {
            alert(obj[i].title)
            console.log(obj[i].term)
        }
    }

    // TODO: Hash function, this one is simple placeholder
    function hash(str) {
        let tpstr = String(str).toLowerCase(), temp = 0
        // FIXME: Beware with non alphanumeric
        for (let i = 0; i < tpstr.length; i++)
            temp += tpstr.charCodeAt(i) * 37
        return temp
    }    

    // TODO: Check again
    function stringToHashTable(str) {
        let tpstr = String(str)
        // TODO: this is shit regex, change with alpha check
        tpstr = tpstr.replace(/(,|\.|\/|\\|"|'|-|:|\(|\)|\*|\n|\r)/gi, " ").split(" ")
        // Processing array of raw text to hash table
        for (let i = 0; i < tpstr.length; i++)
            if (tpstr[i] === "")
                tpstr.splice(i--, 1)

        var hashTable = {}
        for (let i = 0; i < tpstr.length; i++) {
            if (hashTable[hash(tpstr[i])] === undefined)
                hashTable[hash(tpstr[i])] = 1
            else
                hashTable[hash(tpstr[i])]++
        }
        return hashTable
    }

    function hashTableNorm(htable) {
        let sum = 0
        for (let i in htable)
            sum += Math.pow(htable[i], 2)
        return Math.sqrt(sum)
    }


    function getDocumentDatabase() {
        // Get from firebase and save to data
        axios.get(`https://tubes-algeo-02.firebaseio.com/document.json`)
        .then(resource => {
            console.log(resource.data) // DEBUG
            setDatabase(resource.data)
        })
    }

    function uploadFileToFirebase(){
        let hashTable = stringToHashTable(file)

        // Upload to firebase
        const newDocument = {
            title: document.getElementById("fileUpload").value.substring(12),
            value: stringFile,
            term: hashTable
        }
        axios.post(`https://tubes-algeo-02.firebaseio.com/document.json`, newDocument)
        // DEBUG
        alert("posted")
    }


    function setSearchTextBox(e){
        setSearchText(e.target.value)
    }

    function writeQueryText(){
        setQuery("Query: ".concat(searchtext))
    }
    
    function querySearch() {
        writeQueryText()
        getDocumentDatabase()
        let queryHashTable = stringToHashTable(searchtext)

        // Dot product
        let queryRank = {}
        for (var key in database) {
            let rank = 0, document = database[key]
            let queryNorm = hashTableNorm(document.term)
            let docNorm = hashTableNorm(queryHashTable)
            for (var qHash in queryHashTable) {
                if (document.term[qHash] === undefined)
                    continue
                rank += document.term[qHash]*queryHashTable[qHash]
            }
            queryRank[key] = rank / (queryNorm*docNorm)
        }
        console.log(queryRank)
        alert("success")
    }

    
    
    // DEBUG
    function altex() {
        alert(stringFile)
    }


    var classes = useStyles();
    return (
        <div>
            <div className="container">
                <h1 className={classes.title}>JUDUL</h1>
                {/* Query search */}
                <input type="text" onChange={(e) => setSearchTextBox(e)}/>
                <button type="button" class="btn btn-primary" onClick={() => querySearch()}>Search</button>
                <div></div>
                {/* User file upload */}
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <input type="file" id="fileUpload" ref={fileInput} accept=".txt"/>
                    <button type="submit" ref={uploadSubmitButton}>Upload</button>
                </form>
                {/* DEBUG */}
                <button type="button" onClick={() => altex()}>Read Uploaded</button>
                <div></div>
                <button type="button" onClick={() => uploadFileToFirebase()}>Post Firebase</button>
                <button type="button" onClick={() => getDocumentDatabase()}>Get Firebase</button>
                <button type="button" onClick={() => dbg(database)}>Read Database</button>
                <h5>{query}</h5>
            </div>
        </div>
    );
}

export default SearchEngine