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

    axios.get(`https://tubes-algeo-02.firebaseio.com/document.json`)
    .then(res => {
        let tampung = res.data
        console.log(tampung)
        setData(tampung)
    })

    console.log(data)

    function ubahText(e){
        console.log(e)
        setText(e.target.value)
        let string = "Makan orang"
        console.log(string.substring(1,3))
    }

    function ubahRadio(e){
        console.log(e.target.value)
    }

    function jumlah (a,b,c){
        console.log(a+b+c)
    }

    function tulis(){
        console.log("makan")
    }

    React.useEffect(() =>{
        console.log(text)
    },[text])

    var classes = useStyles();
    let a = 3;
        return (
            <div>
                <div className="container">
                    <h1 className={classes.title}>JUDUL</h1>
                    <input type="text" onChange={(e) => ubahText(e)}/>
                    <input type="checkbox" onChange={(e) => ubahRadio(e)}/>
                    <button type="button" class="btn btn-primary" onClick={() => alert("Test Doang Gan")}>Alert</button>
                    <button type="button" class="btn btn-primary" onClick={() => tulis()}>jumlah</button>
                </div>
            </div>
        );
    
}

export default SearchEngine