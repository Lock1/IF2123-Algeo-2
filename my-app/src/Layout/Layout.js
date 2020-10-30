
import NavBar from "../Components/NavBar";
import "../Styles/bootstrap.min.css"

function Layout(props){

    return (
        <div>
            <NavBar/> 
            <div className="container">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;