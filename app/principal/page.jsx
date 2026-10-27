import Header from "../components/header";
import styles from "./principal.module.css";

export default function Principal() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.hero}>
                    <p className={styles.status}>
                        SISTEMA ONLINE ● ANO LETIVO 2026
                    </p>

                    <h2>
                        Bem-vindo ao Sistema Escolar
                        <span> SESI Mirandópolis</span>
                    </h2>

                    <p>
                        Plataforma de gerenciamento acadêmico para
                        acompanhamento de alunos, notas, frequência e
                        desenvolvimento educacional.
                    </p>

                    <button className={styles.btn}>
                        Acessar Portal
                    </button>
                </section>

                <section className={styles.cards}>
                    <div className={styles.card}>
                        <h3>👨‍🎓 Alunos</h3>
                        <p>
                            Gerencie informações cadastrais e histórico dos
                            estudantes.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>📊 Notas</h3>
                        <p>
                            Consulte e acompanhe o desempenho acadêmico.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>📅 Frequência</h3>
                        <p>
                            Controle presenças e faltas em tempo real.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>🚀 Projetos</h3>
                        <p>
                            Monitore projetos e atividades desenvolvidas pelos
                            estudantes.
                        </p>
                    </div>
                </section>

                <section className={styles.dashboard}>
                    <h2>Painel Escolar</h2>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <h3>645</h3>
                            <p>Alunos</p>
                        </div>

                        <div className={styles.stat}>
                            <h3>32</h3>
                            <p>Turmas</p>
                        </div>

                        <div className={styles.stat}>
                            <h3>95%</h3>
                            <p>Frequência Média</p>
                        </div>

                        <div className={styles.stat}>
                            <h3>28</h3>
                            <p>Projetos Ativos</p>
                        </div>
                    </div>
                </section>

                <section className={styles.timeline}>
                    <h2>Linha do Tempo Acadêmica</h2>

                    <div className={styles.event}>
                        <span>01</span>
                        <p>Início do Ano Letivo</p>
                    </div>

                    <div className={styles.event}>
                        <span>02</span>
                        <p>Avaliações Bimestrais</p>
                    </div>

                    <div className={styles.event}>
                        <span>03</span>
                        <p>Feira Tecnológica</p>
                    </div>

                    <div className={styles.event}>
                        <span>04</span>
                        <p>Encerramento do Semestre</p>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>
                    SESI Mirandópolis • Sistema Escolar Futurista © 2026
                </p>
            </footer>
        </>
    );
}