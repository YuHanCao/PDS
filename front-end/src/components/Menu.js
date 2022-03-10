import { Link } from 'react-router-dom'
import logo from '../img/Logo_Horizontal.png'
import styles from './Menu.module.css'
import Banner from './Banner';

function Menu() {
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
                </ul>
            </nav>
        </section>
    </header>
     <Banner/>
        </>
    );
}

export default Menu;