import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import sastrawijs from 'sastrawijs'
import PublishIcon from '@material-ui/icons/Publish';
import { Button, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton,
    Dialog, Tooltip, Snackbar, Table, TableRow, TableHead, TableBody, TableCell, TableContainer } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableChartIcon from '@material-ui/icons/TableChart';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    title: {
        marginTop: "3%",
        textAlign: "center"
    },
    flex_center: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "3%",
        marginBottom: "2%"
    },
    uploadButton: {
        padding: "0.5%",
        paddingLeft: "2%",
        paddingRight: "2%",
        marginLeft: "2%",
        marginTop: "5%",
        minWidth: "20%",
        backgroundColor: "#3498db",
        color: "white",
        "&:focus, &:hover": {
            color: "#fff",
            backgroundColor: "#2384c6",
            borderColor: "#217dbb",
        },
    },
    cancelButton: {
        padding: "0.5%",
        paddingLeft: "2%",
        paddingRight: "2%",
        marginLeft: "2%",
        marginTop: "5%",
        minWidth: "20%",
        backgroundColor: "#e74c3c",
        color: "white",
        "&:focus, &:hover": {
            color: "#fff",
            backgroundColor: "#d62c1a",
            borderColor: "#e74c3c",
        },
    },
    searchResultFlex: {
        paddingLeft: "3%",
    },
    heading: {
        color: "black",
        "&:focus, &:hover": {
            color: "#18bc9c",
            textDecoration: "none"
        },       
    },
});

function SearchEngine(){
    // ------------ Configuration constant ------------
    const stopwordKey = "-MLonniE4V-PfxvTHTHi"
    const firebaseLink = "https://tubes-algeo-02.firebaseio.com/"
    const firebaseStopwordLink = firebaseLink.concat("stopword.json")
    const firebaseDocumentLink = firebaseLink.concat("document.json")
    // ------------------------------------------------

    // ----- Variable and constant initialization -----
    const [rankAndTermState, setRankAndTermState] = React.useState(null)
    const [searchText, setSearchText] = React.useState("")
    const [databaseState, setDatabaseState] = React.useState(null)
    var database = {}, stopwords = {}

    // -- React references --
    const uploadSubmitButton = React.createRef(null)
    const fileInput = React.createRef(null)

    // --- Dialog Variable and States initialization ---
    const [open, setOpen] = React.useState(false)
    const [openTable, setOpenTable] = React.useState(false)
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false)
    const [openErrorUploadSnackbar, setOpenErrorUploadSnackbar] = React.useState(false)

    // ---- Dialog Upload ----
    function HandleOpenDialog(){
        setOpen(true)
    }

    function handleCloseDialog(){
        setOpen(false)
    }

    // ---- Dialog Tabel ----
    const HandleOpenDialogTable = (event) => {
        if(rankAndTermState !== null){
            setOpenTable(true)
        }
        else {
            event.stopPropagation()    
            HandleOpenErrorSnackbar()
             
        }
    }

    function handleCloseDialogTable(){
        setOpenTable(false)
    }

    // --- Snackbar ---
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    // ---- Snackbar Error Open Table ----
    function HandleOpenErrorSnackbar(){
        setOpenErrorSnackbar(true)
    }

    function HandleCloseErrorSnackbar(event, reason){
        setOpenErrorSnackbar(false)
    }

    // ---- Snackbar Error Upload ----
    function HandleOpenErrorUploadSnackbar(){
        setOpenErrorUploadSnackbar(true)
    }

    function HandleCloseErrorUploadSnackbar(){
        setOpenErrorUploadSnackbar(false)
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
        // hash = crypto.createHash('sha256').update(tpstr).digest('hex') // Using library
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

    // HTML Scrapper, taking raw string and output as tuple [title,content]
    function htmlScrapper(stringHTML){
        var HTMLtitle = String(stringHTML).match(/<\s*title[^>]*>(.*?)<\s*\/\s*title\s*>/gi)
        var content = String(stringHTML).match(/<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/gi)
        if (content && HTMLtitle)
            return [HTMLtitle[0].replace(/<\s*\/*title[^>]*>/gi, " "), content.join("").replace(/\s+/gi, " ").replace(/<\s*\/*p[^>]*>/gi, " ")]
        else
            return [undefined, undefined]
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
    async function uploadFileToFirebase(docTitle, docValue, wCount, firstSentence,  hashTable) {

        // Upload to firebase
        const newDocument = {
            // First 12 char on fileUpload are placeholder for security reasons
            title: docTitle,
            value: docValue,
            wordcount: wCount,
            description: firstSentence,
            term: hashTable
        }

        await axios.post(firebaseDocumentLink, newDocument)
    }

    // Query search from database
    async function querySearch() {
        // Draw query text
        // Force wait for update and convert query to hashtable
        database = await getDocumentDatabase()
        stopwords = await getStopwordsDatabase()
        let queryHashTable = stringToHashTable(searchText)
        // FIXME : Query

        // -> Specification requirement
        let querystr = String(searchText).replace(/[\W_]/gim, " ").split(" ")
        querystr = querystr.filter(function(str) { return /\S+/.test(str) })
        // <---------------------------

        // Similarity calculation
        let queryResult = []
        for (var key in database) {
            let dotProduct = 0, doc = database[key]
            // Case when theres no term
            if (doc.term === undefined)
                continue
            // Q & D Norm calculation
            let queryNorm = hashTableNorm(queryHashTable)
            let docNorm = hashTableNorm(doc.term)

            // Dot product
            for (let qHash in queryHashTable) // && (doc.term.count !== doc.term[qHash])
                if ((doc.term[qHash] !== undefined) && (queryHashTable[qHash] !== undefined))
                    dotProduct += doc.term[qHash]*queryHashTable[qHash]

            // Calculating similiarity with dot(Q,D) / (||Q||*||D||)
            if (queryNorm && docNorm)
                queryResult.push([doc.title, doc.wordcount, 100 * dotProduct / (queryNorm * docNorm), doc.description, hashTableToString(doc.term, querystr), String(key)])
            else
                queryResult.push([doc.title, doc.wordcount, 0.0, doc.description, hashTableToString(doc.term, querystr), String(key)])
        }
        // Sorting according similiarity rank
        queryResult.sort(function(a,b) {return b[2] - a[2]})

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
        if (fileInput.current.files.length !== 0){
            event.preventDefault()
            database = await getDocumentDatabase()
            stopwords = await getStopwordsDatabase()

            for (let i = 0; i < fileInput.current.files.length; i++) {
                let textFile, titleFile, hashTable, wCount, firstSentence
                // HTML file branch
                if (await fileInput.current.files[i].name.match(/\.html/)){
                    [titleFile, textFile] = htmlScrapper(await fileInput.current.files[i].text())
                    if (titleFile && textFile) {
                        hashTable = stringToHashTable(textFile)
                        wCount = textFile.split(" ").filter(function (str) { return /\S+/.test(str) }).length
                        firstSentence = textFile.replace(/(\.com|\.co\.id|\n|\r)/gi, " ").replace(/\s+/g, " ").split(".")[0]
                        // textFile = await fileInput.current.files[i].text() // Raw HTML String
                    }
                    else
                        continue
                }
                // Text file branch
                else {
                    textFile = await fileInput.current.files[i].text()
                    titleFile = await fileInput.current.files[i].name.replace(/(\.txt|\.html)/, "")
                    hashTable = stringToHashTable(textFile)
                    wCount = textFile.split(" ").filter(function (str) { return /\S+/.test(str) }).length
                    firstSentence = textFile.replace(/(\.com|\.co\.id|\n|\r)/gi, " ").replace(/\s+/g, " ").split(".")[0]
                }
                await uploadFileToFirebase(titleFile, textFile, wCount, firstSentence, hashTable)
            }  
            window.location.reload()
        }
        else {
            event.preventDefault()
            HandleOpenErrorUploadSnackbar()
        }
    }

    // Handler for search
    async function handleSearch() {
        let rankAndTerm = await querySearch()
        setDatabaseState(database)
        setRankAndTermState(rankAndTerm)
    }

    // Update search text into new value
    function setSearchTextBox(event) {
        setSearchText(event.target.value)
    }

    // --- Stopword uploader ---
    // For debug purpose only
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
                <h2 className={classes.title}>SEARCH ENGINE</h2>
                {/* Query search */}
                <div className={classes.flex_center}>
                    <input type="text" id="textBox" onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}} onChange={(e) => setSearchTextBox(e)}/>
                    <button type="button" id="searchButton" className="btn-success" onClick={() => {handleSearch()}}>Search</button>
                    <Tooltip title="Upload Dokumen">
                        <IconButton size="small" style={{marginLeft: "1%"}} onClick={HandleOpenDialog}>
                            <PublishIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Lihat Tabel Terms">
                        <IconButton size="small" style={{marginLeft: "1%"}} onClick={(event) => HandleOpenDialogTable(event)}>
                            <TableChartIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={(event) => HandleCloseErrorSnackbar(event)}>
                    <Alert onClose={(event) => HandleCloseErrorSnackbar(event)} severity="error">
                        Harap Masukkan Query dan Tekan Tombol Search Terlebih Dahulu!
                    </Alert>
                </Snackbar>
                {/* User file upload */}
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"
                    classes={{ paper: classes.paper}}
                    maxWidth="sm"
                    fullWidth
                >
                    <div style={{padding: "3%"}}>
                        <h3 style={{textAlign: "center"}}>UPLOAD DOKUMEN</h3>
                        <form onSubmit={(e) => {handleUpload(e)}}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <input type="file" id="fileUpload" ref={fileInput} accept=".txt,.html" multiple/>
                            </div>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button type="submit" ref={uploadSubmitButton} startIcon={<PublishIcon/>} className={classes.uploadButton} size='medium' variant="outlined">Upload</Button>
                                <Button startIcon={<CancelIcon/>} className={classes.cancelButton} size='medium' variant="outlined" onClick={handleCloseDialog}>Batal</Button>
                            </div>
                        </form>
                        <Snackbar open={openErrorUploadSnackbar} autoHideDuration={6000} onClose={HandleCloseErrorUploadSnackbar}>
                            <Alert onClose={HandleCloseErrorUploadSnackbar} severity="error">
                                Harap Pilih File Terlebih Dahulu!
                            </Alert>
                        </Snackbar>
                    </div>
                </Dialog>
                {/* Table Terms */}
                <Dialog
                    open={openTable}
                    onClose={handleCloseDialogTable}
                    aria-labelledby="responsive-dialog-title"
                    classes={{ paper: classes.paper}}
                >
                    <div style={{padding: "5%"}}>
                        <h3 style={{textAlign: "center", marginBottom: "2%"}}>TABEL TERMS</h3>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: "bold"}}>Nama Dokumen</TableCell>
                                        {(rankAndTermState !== null) ?
                                            Object.keys(rankAndTermState[0][4]).map((value,index) => (
                                                <TableCell style={{fontWeight: "bold"}} scope="row">
                                                    {value}
                                                </TableCell>
                                            )) :
                                            null
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {(rankAndTermState !== null) ?
                                    rankAndTermState.map((value,index) => (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {value[0]}
                                            </TableCell>
                                            {
                                                Object.values(value[4]).map((value,index) => (
                                                    <TableCell component="th" scope="row" align="right">
                                                        {value}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    )) :
                                    null
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                                        <Link to={{
                                            pathname:"/Display-Dokumen",
                                            state: {
                                                document: databaseState[value[5]],
                                                title: value[0]
                                            }
                                        }}
                                        className={classes.heading}>
                                            <Typography variant="h6" className={classes.heading}>{value[0].toUpperCase()}</Typography>
                                        </Link>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Typography>Jumlah Kata : {value[1]}</Typography>
                                            <Typography>Tingkat Kemiripan / Similiarity : {value[2].toPrecision(4)} %</Typography>
                                            <Typography>Kalimat Pertama : {value[3]}</Typography>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        )
                    })
                    :
                        null
                }
            </div>
        </div>
    );
}

export default SearchEngine
