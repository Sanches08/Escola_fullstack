'use client';

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import styles from "../../cadnotas/cadnotas.module.css";

export default function EditNotas({ params }) {
    const { id } = use(params);
    const router = useRouter();

    const [id_aluno, setIdAluno] = useState('');
    const [trabalho1, setTrabalho1] = useState('');
    const [trabalho2, setTrabalho2] = useState('');
    const [nota1, setNota1] = useState('');
    const [nota2, setNota2] = useState('');
    const [nota3, setNota3] = useState('');

    useEffect(() => {
        if (id) {
            carregarNota();
        }
    }, [id]);

    async function carregarNota() {
        try {
            const resposta = await fetch('/api/notas');
            const dados = await resposta.json();

            if (Array.isArray(dados)) {
                const notaEncontrada = dados.find(item => String(item.id_nota) === String(id));
                
                if (notaEncontrada) {
                    setIdAluno(notaEncontrada.aluno_id ?? '');
                    setTrabalho1(notaEncontrada.t1 ?? '');
                    setTrabalho2(notaEncontrada.t2 ?? '');
                    setNota1(notaEncontrada.n1 ?? '');
                    setNota2(notaEncontrada.n2 ?? '');
                    setNota3(notaEncontrada.n3 ?? '');
                }
            }
        } catch (error) {
            console.error('Erro ao buscar dados da nota:', error);
        }
    }

    async function atualizarNota(event) {
        event.preventDefault();

        try {
            const resposta = await fetch('/api/notas', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_nota: Number(id),
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
                router.push('/listnotas');
            }
        } catch (error) {
            console.error('Erro ao atualizar nota:', error);
            alert('Erro ao atualizar a nota.');
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

                        <h2>Editar Nota</h2>

                        <form className={styles.form} onSubmit={atualizarNota}>
                            <div className={styles.campo}>
                                <label htmlFor="id_aluno">ID do Aluno</label>
                                <input
                                    id="id_aluno"
                                    type="number"
                                    disabled
                                    value={id_aluno}
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
                                Atualizar Nota
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}