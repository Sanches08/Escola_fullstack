'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/header";
import styles from './listanotas.module.css';

export default function ListNotas() {
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        buscarNotas();
    }, []);

    async function buscarNotas() {
        try {
            const resposta = await fetch('/api/notas');
            const dados = await resposta.json();

            if (Array.isArray(dados)) {
                setNotas(dados);
            } else {
                setNotas([]);
            }
        } catch (error) {
            console.error('Erro ao buscar notas:', error);
            setNotas([]);
        }
    }

    async function excluirNota(id_nota) {
        if (!confirm("Tem certeza que deseja excluir esta nota?")) return;

        try {
            const resposta = await fetch('/api/notas', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_nota })
            });

            const dados = await resposta.json();
            alert(dados.mensagem || dados.erro);

            if (resposta.ok) {
                buscarNotas();
            }
        } catch (error) {
            console.error('Erro ao excluir nota:', error);
            alert("Erro ao excluir nota.");
        }
    }

    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.tituloArea}>
                    <h2>Lista de Notas</h2>
                    <p>
                        Consulte todas as notas cadastradas no sistema.
                    </p>
                </section>

                <section className={styles.tabelaContainer}>
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>RA</th>
                                <th>T1</th>
                                <th>T2</th>
                                <th>N1</th>
                                <th>N2</th>
                                <th>N3</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {notas.length > 0 ? (
                                notas.map((nota) => (
                                    <tr key={nota.id_nota || nota.aluno_id}>
                                        <td>{nota.nome}</td>
                                        <td>{nota.ra}</td>
                                        <td>{nota.t1 ?? '-'}</td>
                                        <td>{nota.t2 ?? '-'}</td>
                                        <td>{nota.n1 ?? '-'}</td>
                                        <td>{nota.n2 ?? '-'}</td>
                                        <td>{nota.n3 ?? '-'}</td>
                                        <td>
                                            <Link href={`/editnotas/${nota.id_nota}`}>
                                                <button className={styles.botaoEditar}>
                                                    Editar
                                                </button>
                                            </Link>
                                            <button 
                                                className={styles.botaoExcluir}
                                                onClick={() => excluirNota(nota.id_nota)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Nenhuma nota encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}