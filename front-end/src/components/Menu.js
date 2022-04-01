import { Link, useNavigate } from 'react-router-dom'
import logo from '../img/Logo_Horizontal.png'
import styles from './Menu.module.css'
import Banner from './Banner';
import GoogleLogin from "react-google-login";
import Axios from "axios";

function Menu() {

    const navigate = useNavigate();

    const handleLogin = async googleData => {
        const tokenId = googleData.tokenId
        console.log(googleData)
        console.log(tokenId)

        try {
            const {data} = await Axios.post(`http://localhost:3030/googleLogin`, {
                token: tokenId
            });
            const user = data.user[0]
            console.log(data)

            if(user){
                window.localStorage.setItem("@user_email", user.email)
                window.localStorage.setItem("@user_name", user.nome)
                window.localStorage.setItem("@user_cargo", user.cargo)

            }
            
            navigate('/', {replace: true});
            navigate('/Plantio', {replace: true});
        } catch (err) {
            console.log(err);
        }
    }

    function logOut(){
        window.localStorage.clear();
        navigate('/', {replace: true});
    }   

    return (
        <>

         <header className={styles.header}>
        <section className={styles.topo}>
            <div className={styles.titulo}>
                <p>Serviço de Plantio e Poda</p>
            </div>
            <div className={styles.telefone}>
                <p>(15) 90000-0000</p>
            </div>
        </section>
        <section className={styles.baixo}>
            <Link to="/">
                <img src={logo}/>
            </Link>
            <nav className={styles.header_menu}>
                
                <ul>
                    <li><Link to="/Plantio">Mapa</Link></li>
                    <li><GoogleLogin
                    clientId={"1010290390610-ft46t2lr0ll07vl1vk427d8ctqcjaplj.apps.googleusercontent.com"}
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    /></li>
                    <li><button onClick={logOut}>LogOut</button></li>
                </ul>
            </nav>
        </section>
    </header>
     <Banner/>
        </>
    );
}

export default Menu;