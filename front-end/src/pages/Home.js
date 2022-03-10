import styles from './Home.module.css'

function Home() {
    return (
        <>
            <section className={styles.explicativo}>
        <div className={styles.texto}>
            <div>
                <p>A <strong>Nature Network</strong> é um site feito para <span className={styles.cor}>consultas de árvores e regiões arborizadas de Sorocaba.</span> Aqui você pode ver cada região arborizada e onde está plantada cada árvore, além de informações como idade, data em que foi plantada e data da última poda. </p>

                <p>Além disso, é possível solicitar podas, caso necessário, e também o plantio de novas árvores para enriquecer a sua vizinhaça ou até mesmo dar mais vida ao local. </p>
            </div>
        </div>
    </section>

    <div className={styles.atendimento}>
        <h2>Serviços</h2>
    </div>

    <div className={styles.lista}>
        <div className={styles.esquerda}>
            <ul>
                <li>Plantio</li>
                <p>Garantimos o plantio de uma muda em determinadas localizações com apenas alguns cliques!</p>
                <li>Poda​</li>
                <p>Caso alguma árvore esteja atrapalhando alguma localizaçao, é possível requerir à poda da mesma.</p>
            </ul>
        </div>
        <div className={styles.direita}>
            <ul>
                <li>Consulta​</li>
                <p>Consulte aqui a situação da árvore/muda desejada, basta localizar o pin desejado
                    para saber sua situação.</p>
                <li>Gestão</li>
                <p>Aqui garantimos o gerenciamento de todas
                    as árvores da cidade para promover a natureza da forma mais adequada.</p>
            </ul>
        </div>
    </div>
        </>
    );
}

export default Home;