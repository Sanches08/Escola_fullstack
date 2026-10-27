'use client';

import { useState } from "react";
import Header from "../components/header";
import styles from "./cadnotas.module.css";

export default function CadNotas() {
    const [id_aluno, setIdAluno] = useState('');
    const [trabalho1, setTrabalho1] = useState('');
    const [trabalho2, setTrabalho2] = useState('');
    const [nota1, setNota1] = useState('');
    const [nota2, setNota2] = useState('');
    const [nota3, setNota3] = useState('');

    async function cadastraAluno(event) {
        event.preventDefault();
        const resposta = await fetch("/api/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_aluno: Number(id_aluno),
                trabalho1: trabalho1 !== '' ? Number(trabalho1) : null,
                trabalho2: trabalho2 !== '' ? Number(trabalho2) : null,
                nota1: nota1 !== '' ? Number(nota1) : null,
                nota2: nota2 !== '' ? Number(nota2) : null,
                nota3: nota3 !== '' ? Number(nota3) : null
            })
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            setIdAluno('');
            setTrabalho1('');
            setTrabalho2('');
            setNota1('');
            setNota2('');
            setNota3('');
        }
    }

    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.container}>
                    <div className={styles.painel}>
                        <p className={styles.status}>
                            SISTEMA ONLINE
                        </p>

                        <h2>Cadastro de Notas</h2>

                        <form className={styles.form} onSubmit={cadastraAluno}>
                            <div className={styles.campo}>
                                <label htmlFor="id_aluno">ID do Aluno</label>
                                <input
                                    id="id_aluno"
                                    type="number"
                                    required
                                    value={id_aluno}
                                    onChange={(e) => setIdAluno(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="trabalho1">Trabalho 1</label>
                                <input
                                    id="trabalho1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={trabalho1}
                                    onChange={(e) => setTrabalho1(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="trabalho2">Trabalho 2</label>
                                <input
                                    id="trabalho2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={trabalho2}
                                    onChange={(e) => setTrabalho2(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="nota1">Nota 1</label>
                                <input
                                    id="nota1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={nota1}
                                    onChange={(e) => setNota1(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="nota2">Nota 2</label>
                                <input
                                    id="nota2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={nota2}
                                    onChange={(e) => setNota2(e.target.value)}
                                />
                            </div>

                            <div className={styles.campo}>
                                <label htmlFor="nota3">Nota 3</label>
                                <input
                                    id="nota3"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={nota3}
                                    onChange={(e) => setNota3(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.botao}
                            >
                                Salvar Nota
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}