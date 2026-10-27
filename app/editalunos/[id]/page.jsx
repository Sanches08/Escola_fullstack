"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/header"; // Adiciona o Header se usares nas outras páginas
import styles from "./id.module.css";

export default function EditarAlunoPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id || searchParams?.get("id");

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarAluno(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarAluno(idAluno) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/alunos?id=${idAluno}`);

            if (!resposta.ok) {
                alert("Aluno não encontrado!");
                router.push("/listalunos");
                return;
            }

            const dados = await resposta.json();
            setNome(dados.nome || "");
            setIdade(dados.idade || "");
            setSerie(dados.serie || "");
            setRa(dados.ra || "");
        } catch (erro) {
            console.error("Erro ao carregar aluno:", erro);
            alert("Erro ao carregar dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    async function salvarAluno(event) {
        event.preventDefault();

        if (!id) {
            alert("ID do aluno não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/alunos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                nome,
                idade,
                serie,
                ra,
            }),
        });

        const dados = await resposta.json();

        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listalunos");
        }
    }

    if (carregando) {
        return (
            <main className={styles.main}>
                <section className={styles.container}>
                    <h1>Editar Aluno</h1>
                    <p>Carregando informações do aluno...</p>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <section className={styles.container}>
                <h1>Editar Aluno</h1>

                <form onSubmit={salvarAluno} className={styles.formulario}>
                    <label>Nome</label>
                    <input
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        required
                    />

                    <label>Idade</label>
                    <input
                        type="number"
                        value={idade}
                        onChange={(event) => setIdade(event.target.value)}
                        required
                    />

                    <label>Série</label>
                    <input
                        value={serie}
                        onChange={(event) => setSerie(event.target.value)}
                        placeholder="Ex.: 3º A"
                        required
                    />

                    <label>RA</label>
                    <input
                        value={ra}
                        onChange={(event) => setRa(event.target.value)}
                        required
                    />

                    <button type="submit">Salvar Alterações</button>
                </form>

                <Link href="/listalunos">Voltar</Link>
            </section>
        </main>
    );
}