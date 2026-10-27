'use client';

import { useState } from "react";
import Header from "../components/header";
import styles from "./cadaluno.module.css";
import { redirect } from "next/navigation";

export default function CadAlunos() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');

    async function cadastraAluno(event){
        event.preventDefault();
        const resposta = await fetch("/api/alunos",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                idade,
                serie,
                ra
            })
        })
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro)
        if(resposta.ok){
           redirect('/listalunos')
        }
    }

    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.painel}>
                        <p className={styles.status}>
                            SISTEMA ONLINE ● CADASTRO DE ESTUDANTES
                        </p>

                        <h2>Cadastro de Alunos</h2>

                        <form className={styles.form} onSubmit={cadastraAluno}>
                            <div className={styles.campo}>
                                <label htmlFor="nome">Nome Completo</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="idade">Idade</label>
                                <input
                                    id="idade"
                                    type="number"
                                    value={idade}
                                    onChange={(e) => setIdade(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="serie">Série</label>
                                <input
                                    id="serie"
                                    type="text"
                                    value={serie}
                                    onChange={(e) => setSerie(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="ra">RA</label>
                                <input
                                    id="ra"
                                    type="number"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.botao}
                            >
                                Salvar Aluno
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}