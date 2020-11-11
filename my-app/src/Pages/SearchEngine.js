import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import Picture from '../Images/HomeBackground.jpg'
import axios from 'axios'
import sastrawijs from 'sastrawijs'
import PublishIcon from '@material-ui/icons/Publish';
import { Button, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Dialog, Tooltip } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    flex_center: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "3%"
    },
    uploadButton: {
        padding: "0.5%",
        paddingLeft: "1%",
        paddingRight: "1%",
        backgroundColor: "#3498db",
        color: "white",
        "&:focus, &:hover": {
            color: "#fff",
            backgroundColor: "#2384c6",
            borderColor: "#217dbb",
        },
    },
    searchResultFlex: {
        marginBottom: "0.8%",
        paddingLeft: "3%",
        padding: "1%"
    }
});

function SearchEngine(){
    // TODO : HTML Scrapping
    // TODO : Sim check, narkoba
    // ------------ Configuration constant ------------
    const stopwordKey = "-MLonniE4V-PfxvTHTHi"
    const firebaseLink = "https://tubes-algeo-02.firebaseio.com/"
    const firebaseStopwordLink = firebaseLink.concat("stopword.json")
    const firebaseDocumentLink = firebaseLink.concat("document.json")
    // ------------------------------------------------

    // ----- Variable and constant initialization -----
    const [rankAndTermState, setRankAndTermState] = React.useState(null) // DEBUG
    const [searchText, setSearchText] = React.useState("")
    const [query, setQuery] = React.useState("")
    var database = {}, stopwords = {}
    
    // -- React references --
    const uploadSubmitButton = React.createRef(null)
    const fileInput = React.createRef(null)

    // ---- Dialog ----
    const [open, setOpen] = React.useState(false)

    function HandleOpenDialog(){
        setOpen(true)
    }
      
    function handleCloseDialog(){
        setOpen(false)
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
    
    // Removing stopwords from a hashtable
    function stripStopword(htable) {
        // stopwordKey must be configured properly
        let hashTableStopWords = stopwords[stopwordKey].term

        for (var stopword in hashTableStopWords)
            if (htable[stopword] !== undefined)
                htable[stopword] = undefined

        return htable
    }

    /* -- Stemmer function --
    Input raw string, output as array of string.
    Word stemming using sastrawi library */
    function stemString(stringDoc) {
        var tokenizer = new sastrawijs.Tokenizer()
        var stemmer = new sastrawijs.Stemmer()
        var stemmed = []
        var words = tokenizer.tokenize(stringDoc)
        for (var word of words)
            stemmed.push(stemmer.stem(word))
        return stemmed
    }

    function scrapeWords(stringHTML){
        var content=stringHTML.match(/<\s*p[^>]*>(.*?)<\s*\/\s*p\s*>/gi)
        var result=content.join("").replace(/<\s*\/*p[^>]*>/gi," ")
        return result
    }

    function debogg(){
        var isi="<p test=asu>Aku jancok</p> <p>okee</p> <p>COKKKKKKKKK</p>"
        console.log(scrapeWords(isi))
    }

    // Taking string and output as hashtable with word count as entry
    function stringToHashTable(str) {
        // Note : Due stripStopword() using database, 
        // every stringToHashTable() call need handler for null database

        // Replace non-alphanumeric
        let tpstr = String(str).replace(/[\W_]/gim, " ")
        // Stem string
        tpstr = stemString(tpstr)

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
    
    // Get from firebase and return it
    function getDocumentDatabase() {
        return new Promise(function (rs) { axios.get(firebaseDocumentLink).then((response) => { rs(response.data) }) })
    }

    // Get from firebase and return it
    function getStopwordsDatabase() {
        return new Promise(function (rs) { axios.get(firebaseStopwordLink).then((response) => { rs(response.data) }) })
    }
    
    // Upload user document to firebase
    async function uploadFileToFirebase(docTitle,textFile) {
        database = await getDocumentDatabase()
        stopwords = await getStopwordsDatabase()
        let hashTable = stringToHashTable(textFile)
        let wCount = textFile.split(" ").filter(function (str) { return /\S+/.test(str) }).length
        let firstSentence = textFile.replace(/(\.com|\.co\.id|\n|\r)/gi, " ").replace(/\s+/g, " ").split(".")[0]
        // Upload to firebase
        const newDocument = {
            // First 12 char on fileUpload are placeholder for security reasons
            title: docTitle, 
            value: textFile,
            wordcount: wCount,
            description: firstSentence,
            term: hashTable
        }

        await axios.post(firebaseDocumentLink, newDocument)
    }
    
    // Query search from database
    async function querySearch() {
        // Draw query text
        writeQueryText()
        // Force wait for update and convert query to hashtable
        database = await getDocumentDatabase()
        stopwords = await getStopwordsDatabase()
        let queryHashTable = stringToHashTable(searchText)
        
        // DEBUG
        // -> Specification requirement
        console.clear()
        console.log(`---- Query : ${searchText} ----`)
        console.log("---- Document vectors ----")
        let querystr = String(searchText).replace(/[\W_]/gim, " ").split(" ")
        querystr = querystr.filter(function(str) { return /\S+/.test(str) })
        // <---------------------------

        // Similarity calculation
        let queryResult = []
        for (var key in database) {
            let dotProduct = 0, doc = database[key]
            // Q & D Norm calculation
            let queryNorm = hashTableNorm(queryHashTable)
            let docNorm = hashTableNorm(doc.term)
            
            // Dot product
            for (let qHash in queryHashTable)
                if ((doc.term[qHash] !== undefined) && (queryHashTable[qHash] !== undefined))
                    dotProduct += doc.term[qHash]*queryHashTable[qHash]
            
            // Calculating similiarity with dot(Q,D) / (||Q||*||D||)
            queryResult.push([doc.title, doc.wordcount, 100 * dotProduct / (queryNorm * docNorm), doc.description, hashTableToString(doc.term, querystr)])

            // DEBUG
            // -> Specification requirement
            console.log(doc.title)
            console.log(hashTableToString(doc.term, querystr))
            // <---------------------------
        }
        // Sorting according similiarity rank
        queryResult.sort(function(a,b) {return b[2] - a[2]})

        // DEBUG
        console.log("---- Raw query rank ----")
        console.log("[Title, wordcount, similiarity, first sentence, termcount]")
        console.log(queryResult)
        console.log("----------------------------------------------")

        return queryResult
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
        let strstem = stemString(strorigin.join(" "))
        for (let i = 0; i < strstem.length; i++) {
            // Find any matching hashed text in htable entries
            for (let x in htable)
                if (String(hash(strstem[i])) === String(x)) {
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

    // Handler for uploading file
    async function handleUpload(event) {
        event.preventDefault()
        for (let i = 0; i < fileInput.current.files.length; i++) {
            // TODO : HTML scrap
            let textFile = await fileInput.current.files[i].text()
            let titleFile = await fileInput.current.files[i].name.replace(/(\.txt|\.html)/, "")
            await uploadFileToFirebase(titleFile, textFile)
        }
        // TODO: Add loading animation?
        window.location.reload()
    }

    // Handler for search
    async function handleSearch() {
        let rankAndTerm = await querySearch()
        setRankAndTermState(rankAndTerm)
        console.log(rankAndTerm)
    }

    // Update search text into new value
    function setSearchTextBox(event) {
        setSearchText(event.target.value)
    }

    // Draw / print query text
    function writeQueryText() {
        setQuery("Query: ".concat(searchText))
    }
    
    // --- Stopword uploader ---
    // async function dbupload() {
    //     let textha = await fileInput.current.files[0].text()
    //     let tpstr = String(textha).replace(/[\W_]/gim, " ").split(" ")
    //     tpstr = tpstr.filter(function (str) { return /\S+/.test(str) })
    //     var hashTable = {}
    //     for (let i = 0; i < tpstr.length; i++) {
    //         if (hashTable[hash(tpstr[i])] === undefined)
    //             hashTable[hash(tpstr[i])] = 1
    //         else
    //             hashTable[hash(tpstr[i])]++
    //     }
    //     const stopword = {
    //         title:"stopword",
    //         value: textha,
    //         term: hashTable
    //     }
    //     await axios.post(firebaseStopwordLink,stopword)
    // }

    // ------------------------------------------------------------------------------------------------------





    const classes = useStyles();
    return (
        <div>
            <div className="container">
                <h1 className={classes.title}>SEARCH ENGINE</h1>
                {/* Query search */}
                <div className={classes.flex_center}>
                    <input type="text" id="textBox" onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}} onChange={(e) => setSearchTextBox(e)}/>
                    <button type="button" id="searchButton" class="btn-success" onClick={() => {handleSearch()}}>Search</button>
                    {/*<button type="button" id="searchButton" class="btn btn-primary" onClick={() => {debogg()}}>Debug</button>*/}
                    <Tooltip title="Upload Dokumen">
                        <IconButton size="small" style={{marginLeft: "1%"}} onClick={HandleOpenDialog}>
                            <PublishIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                {/* User file upload */}
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"
                    classes={{ paper: classes.paper}}
                >
                    <div style={{padding: "5%"}}>
                        <form onSubmit={(e) => {handleUpload(e)}}>  
                            <input type="file" id="fileUpload" ref={fileInput} accept=".txt,.html" multiple/>
                            <Button type="submit" ref={uploadSubmitButton} startIcon={<PublishIcon/>} class="btn-info" className={classes.uploadButton} size='medium'>Upload</Button>
                            {/*<button type="submit" ref={uploadSubmitButton}>Upload</button>*/}
                        </form>
                    </div>
                </Dialog>
                
                {(rankAndTermState !== null) ?
                    rankAndTermState.map((value,index) => {
                        return(
                            <div className={classes.searchResultFlex}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>{value[0].toUpperCase()}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Typography>Jumlah Kata : {value[1]}</Typography>
                                            <Typography>Tingkat Kemiripan : {value[2].toPrecision(4)} %</Typography>
                                            <Typography>Kalimat Pertama : {value[3]}</Typography>
                                            {/*<Typography>Jumlah Kemunculan Terms Query Pada Dokumen : {value[4]}</Typography>*/}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                    :
                        null
                }
                {/* 
                <button type="button" onClick={() => altex()}>Read Uploaded</button>
                <div></div>
                <button type="button" onClick={() => uploadFileToFirebase()}>Post Firebase</button>
                <button type="button" onClick={() => getDocumentDatabase()}>Get Firebase</button>
                <button type="button" onClick={() => dbg(database)}>Read Database</button>
                <h5>{query}</h5>
                DEBUG */}
            </div>
        </div>
    );
}

export default SearchEngine