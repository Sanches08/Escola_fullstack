'use client';
import { useState, useEffect } from "react";
import Header from "../components/header";
import styles from './listalunos.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarAlunos()
    }, [])//toda vez que a tela for recarregada

    async function buscarAlunos() {
        const resposta = await fetch('/api/alunos');
        const dados = await resposta.json();

        setAlunos(dados);
    }
    async function editarAluno(id){
        router.push(`/editalunos/${id}`)
    }

    async function excluiraAluno(event){
        event.preventDefault();
        if(!confirm('Deseja realmente excluir este aluno?'))return;
        const resposta = await fetch("/api/alunos",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_aluno: event.target.dataset.id
            })
        })
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro)
       buscarAlunos();
    }


    return (
        <>
            <Header />

            <main className={styles.main}>

                <section className={styles.tituloArea}>
                    <h2>Lista de Alunos</h2>

                    <p>
                        Consulte todos os alunos cadastrados no sistema.
                    </p>
                </section>

                <section className={styles.tabelaContainer}>

                    <table className={styles.tabela}>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Série</th>
                                <th>RA</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id_aluno}>
                                    <td>{aluno.id_aluno}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.idade}</td>
                                    <td>{aluno.serie}</td>
                                    <td>{aluno.ra}</td>

                                    <td>
                                        <button 
                                            className={styles.botaoEditar} 
                                            onClick={() => editarAluno(aluno.id_aluno)}
                                        >
                                            Editar
                                        </button>

                                        <button className={styles.botaoExcluir} onClick={(e) => excluiraAluno(e)} data-id={aluno.id_aluno}>
                                            Excluir
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </section>

            </main>
        </>
    );
}