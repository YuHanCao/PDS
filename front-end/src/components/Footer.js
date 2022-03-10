import { Link } from 'react-router-dom'
import logo from '../img/Logo_Vertical.png'
import styles from './Footer.module.css'

function Footer() {
    return(
        <>
            <footer>
        <div className={styles.footer}>
            <div className={styles.logo}>
                <img src={logo}/>
            </div>
            <div className={styles.texto_meio}>
                <p><strong>Serviços de Plantio e Poda</strong></p>
                <p>@2022 Copyright</p>
                <p>(15) 90000-0000 – Av. Fulano dos Santos, 00 | Bairro Fulano</p>
                <p>Sorocaba – SP | 00000-000 | Brasil</p>
                <br/>
                <br/>
            </div>
            <div className={styles.texto_direita}>
                <p><strong>Horário de Funcionamento:</strong></p>
                <p>Segunda a sexta | 08h às 16h</p>
                <p>Sábado | 12h às 15h</p>
                <p>Redes Sociais:</p>
                <ul>
                    <li><Link to={{pathname: "http://facebook.com"}} target="_blank">FB</Link></li> {"    "}
                    <li><Link to={{pathname: "http://instagram.com"}} target="_blank">IG</Link></li>
                </ul>
            </div>
        </div>
    </footer>
      </>
        
    );
}

export default Footer;