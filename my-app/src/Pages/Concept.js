import React from 'react';
import "../Styles/bootstrap.min.css"
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    link: {
        "&:focus, &:hover": {
            textDecoration: "none",
            color: "white"
        },
        color: "white" 
    },
    button: {
        marginTop:"2%", 
        marginLeft: "2%", 
        marginRight: "2%",
        marginBottom: "2%"
    }
  });

function Concept(){
    const classes = useStyles();
    const [subject, setSubject] = React.useState(null)

    function handleChangeSubject(subject){
        setSubject(subject)
    }

    const content = {
        IR: {
            title : "Information Retrival",
            description : "Sistem temu balik informasi (information retrieval system) merupakan suatu prosedur/metode untuk menemukan kembali informasi yang tersimpan pada berbagai sumber (resources) yang relevan atau koleksi sumber informasi yang dicari/dibutuhkan. Beberapa tindakan yang dapat dilakukan pada IR adalah indexing, searching, dan recalling. Sistem temu balik informasi memiliki banyak peranan dalam kehidupan sehari-hari. Beberapa contoh peranan tersebut adalah sebagai user, kita dapat melihat berbagai macam informasi pada mesin pencari informasi (search engine). Peranan IR adalah untuk menganalisis isi sumber informasi dan pertanyaan pengguna, serta untuk mempertemukan pertanyaan pengguna dengan sumber informasi untuk mendapatkan dokumen yang relevan."
        },
        Vektor: {
            title : "Vektor",
            description : "Vektor merupakan suatu besaran yang memiliki besar (magnitude) dan arah (direction). Vektor biasanya direpresentasikan sebagai sebuah garis panah di dalam ruang 2-dimensi atau 3-dimensi yang panjangnya menggambarkan besarnya dan ujung panahnya menggambarkan arahnya. Vektor ini biasanya disebut vektor geometri dengan ekor garis panah sebagai titik awal (initial point). Dua buah vektor dapat dikatakan ekuivalen apabila besar dan arahnya sama, dan biasanya dinotasikan sebagai v=w. Sebuah vektor dikatakan zero vector apabila panjangnya nol atau titik awal dan titik akhirnya sama. Negatif dari suatu vektor adalah vektor yang besarnya sama tapi arahnya berbeda. Terdapat beberapa operasi aljabar yang dapat diterapkan pada vektor yaitu penambahan, pengurangan, dan perkalian skalar. Ruang vektor merupakan ruang tempat vektor didefinisikan dan biasanya ruang ini disebut dengan ruang Euclidean."
        },
        CS: {
            title : "Cosine Similarity",
            description : "Salah satu metode yang digunakan pada information retrieval system adalah model yang menggunakan ruang vektor. Model ini merepresentasikan dokumen dan query sebagai vektor di dimensi n. Setiap dokumen dan query dinyatakan sebagai vektor w=(w1, w2, …, wn) di dalam Rn.Query dan dokumen tersebut dibandingkan dengan cara membandingkan vektor tersebut dengan cara menggunakan cosine similarity measure. Untuk menentukan dokumen yang relevan sesuai dengan query yang diberikan user, digunakan pengukuran kesamaan (similarity measure) antara query yang diberikan dengan dokumen. Semakin similar sebuah vektor dokumen dengan vektor query, semakin relevan dokumen tersebut dengan query yang diberikan."
        }
    }

    console.log(document)
    
        return (
            <div>
                <div className="container">
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button className={classes.button} onClick={() => handleChangeSubject("IR")}>Information Retrival</Button>
                        <Button color="primary" className={classes.button} onClick={() => handleChangeSubject("Vektor")}>Vektor</Button>
                        <Button color="secondary" className={classes.button} onClick={() => handleChangeSubject("CS")}>Cosine Similarity</Button>
                    </div>
                    {(subject !== null) ? 
                        <div>
                            <Typography variant="h2" align="center">{content[subject].title}</Typography>
                            <Typography style={{marginTop: "2%"}}>{content[subject].description}</Typography>
                            <Button variant="contained" color="primary" style={{marginTop:"2%"}}><a href="/Concept" className={classes.link}>Kembali Ke Konsep Utama</a></Button>
                        </div>
                    : <div><Typography align="center">Search Engine merupakan sebuah mesin yang dapat membantu pengguna untuk mencari dokumen yang dicari berdasarkan Query yang dimaksudkan. Pada Aplikasi ini, pengguna dapat melakukan searching dokumen yang sudah ada, dokumen yang di-upload terlebih dahulu, maupun dokumen dari Web yang kemudian diupload dalam ekstensi .html. Proses pencarian tersebut merupakan aplikasi dari tiga materi yang dipelajari pada Aljabar Linear dan Geometri. Seperti yang telah disebutkan sebelumnya, aplikasi ini juga mampu melakukan Web Scrapping dengan membaca dokumen html.</Typography>
                    <Typography align="center" style={{marginTop: "3%"}}>Tekan Salah Satu SubKonsep Di atas yang Untuk Dipelajari Lebih Lanjut!</Typography>
                    </div>
                    }
                </div>
            </div>
        );
    
}

export default Concept