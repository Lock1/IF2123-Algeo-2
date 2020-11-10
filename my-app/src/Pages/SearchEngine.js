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
    // ------------ Configuration constant ------------
    const stopwordKey = "-MLdJ6O-AElcleOMI9ES"
    const firebaseLink = "https://tubes-algeo-02.firebaseio.com/document.json"
    // ------------------------------------------------

    // Variable and constant initialization
    const [database, setDatabase] = React.useState(null)
    const [searchtext, setSearchText] = React.useState("")
    const [query, setQuery] = React.useState("")
    const [file, setFile] = React.useState("")
    
    const uploadSubmitButton = React.createRef(null)
    const fileInput = React.createRef(null)
    var stringFile = file

    // Handler for uploading file
    const handleSubmit = (e) => {
        e.preventDefault()
        fileInput.current.files[0].text().then((fileContent) => {
            setFile(fileContent)
        }).catch((err) => { console.log(err) })
    }

    // ----------------------------------------- Core functionality -----------------------------------------
    // Simple hash function, taking string and output a number
    function hash(str) {
        let tpstr = String(str).toLowerCase(), hash = 0
        /* -- Hash calculation --
        Get ASCII code on every char in string, and calculate with
        Hash = Sigma (ASCII * 37 + 3)*ASCII                     */
        for (let i = 0; i < tpstr.length; i++)
        hash += (tpstr.charCodeAt(i) * 37 + 3) * tpstr.charCodeAt(i)
        return hash
    }    
    
    // Taking string and output as hashtable with word count as entry
    function stringToHashTable(str) {
        // Replace non-alphanumeric
        let tpstr = String(str).replace(/[\W_]/gim, " ").split(" ") 
        // Delete whitespace on array
        tpstr = tpstr.filter(function(str) {return /\S+/.test(str)})
        
        var hashTable = {}
        /* -- Hashtable counting loop --
        Check whether hashTable["index"] exist,
        if not exist then set hashTable["index"] = 1,
        else hashTable["index"]++           */
        for (let i = 0; i < tpstr.length; i++) {
            if (hashTable[hash(tpstr[i])] === undefined)
            hashTable[hash(tpstr[i])] = 1
            else
            hashTable[hash(tpstr[i])]++
        }
        
        // Strip any stopword in hashtable
        hashTable = stripStopword(hashTable)
        
        return hashTable
    }
    
    // Taking hashtable and output norm of hashtable
    function hashTableNorm(htable) {
        let quadraticSum = 0
        for (let i in htable)
        if (htable[i] !== undefined)
        quadraticSum += Math.pow(htable[i], 2)
        return Math.sqrt(quadraticSum)
    }
    
    // Get from firebase and save to data
    function getDocumentDatabase() {
        axios.get(firebaseLink)
        .then(resource => {setDatabase(resource.data)})
    }
    
    // Upload user document to firebase
    function uploadFileToFirebase(){
        let hashTable = stringToHashTable(file)
        
        // Upload to firebase
        const newDocument = {
            // First 12 char on fileUpload are placeholder for security reasons
            title: document.getElementById("fileUpload").value.substring(12), 
            value: stringFile,
            term: hashTable
        }
        axios.post(firebaseLink, newDocument)
    }
    
    // Query search from database
    function querySearch() {
        writeQueryText()
        getDocumentDatabase() // FIME : force get
        let queryHashTable = stringToHashTable(searchtext)
        
        // -> Specification requirement
        let querystr = String(searchtext).replace(/[\W_]/gim, " ").split(" ")
        querystr = querystr.filter(function(str) { return /\S+/.test(str) })
        // <---------------------------
        
        // Similarity calculation
        let queryRank = {}
        for (var key in database) {
            let dotProduct = 0, document = database[key]
            // Q & D Norm calculation
            let queryNorm = hashTableNorm(document.term)
            let docNorm = hashTableNorm(queryHashTable)
            
            // Dot product
            for (var qHash in queryHashTable)
            if ((document.term[qHash] !== undefined) && (queryHashTable[qHash] !== undefined))
            dotProduct += document.term[qHash]*queryHashTable[qHash]
            
            // Calculating similiarity with dot(Q,D) / (||Q||*||D||)
            queryRank[key] = dotProduct / (queryNorm*docNorm)
            
            // -> Specification requirement
            if (key === stopwordKey) {
                console.log("-- Stopword database --")
                console.log(hashTableToString(document.term,querystr))
                console.log("-----------------------")
            }
            console.log(hashTableToString(document.term, querystr))
            // <---------------------------
        }
        // DEBUG
        console.log("-- Raw query rank --")
        console.log(queryRank)
        alert("check console")
    }
    // ------------------------------------------------------------------------------------------------------
    
    

    // -------------------------------------- Additional functionality --------------------------------------

    // -> Specification requirement
    /* -- Hash table to string function --
    Take input hashtable and string array,
    process and convert hash indexes 
    into original non-hashed string then
    return as string indexed object     */
    function hashTableToString(htable, strorigin) {
        let strtable = {}
        for (let i = 0; i < strorigin.length; i++) {
            // Find any matching hashed text in htable entries
            for (let x in htable)
                if (String(hash(strorigin[i])) === String(x)) {
                    strtable[strorigin[i]] = htable[x]
                    // Break to reduce amount of loop
                    break
                }
            // If not found, then set strtable["string"] = 0
            if (strtable[strorigin[i]] === undefined)
                strtable[strorigin[i]] = 0
        }
        return strtable
    }
    // <---------------------------

    // Removing stopwords from a hashtable
    function stripStopword(htable){ 
        // stopwordKey must be configured properly
        let hashTableStopWords = database[stopwordKey].term

        for (var stopword in hashTableStopWords)
            if (htable[stopword] !== undefined)
                htable[stopword] = undefined
        
        return htable
    }

    // Update search text into new value
    function setSearchTextBox(event) {
        setSearchText(event.target.value)
    }

    // Draw / print query text
    function writeQueryText() {
        setQuery("Query: ".concat(searchtext))
    }
    
    // DEBUG
    function dbg(obj) {
        // Traverse object
        for (var i in obj) {
            alert(obj[i].title)
            console.log(obj[i].term)
        }
    }
    
    // DEBUG
    function altex() {
        console.log(stripStopword(stringToHashTable(stringFile)))
        // console.log(database['-MLdFJGB9v7GV-r8qAtq'])
    }
    // ------------------------------------------------------------------------------------------------------



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