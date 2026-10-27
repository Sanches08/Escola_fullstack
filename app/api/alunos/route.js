import db from "../../db/banco";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const aluno = db.prepare('SELECT * FROM alunos WHERE id_aluno = ?').get(id);

            if (!aluno) {
                return NextResponse.json({ erro: "Aluno não encontrado." }, { status: 404 });
            }

            return NextResponse.json(aluno);
        }

        const alunos = db.prepare('SELECT * FROM alunos ORDER BY nome').all();
        return NextResponse.json(alunos);
    } catch (error) {
        console.error('Erro no GET /api/alunos:', error);
        return NextResponse.json({ erro: "Erro ao buscar alunos." }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();

        if (!dados.nome || String(dados.nome).trim() === '') {
            return NextResponse.json({ erro: "O campo 'nome' é obrigatório." }, { status: 400 });
        }

        const sql = db.prepare(`INSERT INTO alunos (nome, idade, serie, ra) VALUES (?, ?, ?, ?)`);
        const info = sql.run(
            dados.nome.trim(),
            dados.idade ?? null,
            dados.serie ?? null,
            dados.ra ?? null
        );

        return NextResponse.json({
            mensagem: 'Aluno salvo com sucesso!',
            id_aluno: info.lastInsertRowid
        }, { status: 201 });
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        return NextResponse.json({ erro: "Erro ao cadastrar aluno." }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno || dados.id;

        if (!id) {
            return NextResponse.json({ erro: "ID do aluno é obrigatório." }, { status: 400 });
        }

        if (!dados.nome || String(dados.nome).trim() === '') {
            return NextResponse.json({ erro: "O campo 'nome' é obrigatório." }, { status: 400 });
        }

        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);

        const info = sql.run(
            dados.nome.trim(),
            dados.idade ?? null,
            dados.serie ?? null,
            dados.ra ?? null,
            id
        );

        if (info.changes === 0) {
            return NextResponse.json({ erro: "Aluno não encontrado para atualização." }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Aluno atualizado com sucesso!" });
    } catch (error) {
        console.error('Erro ao editar o aluno:', error);
        return NextResponse.json({ erro: "Erro ao editar o aluno." }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = dados.id_aluno || dados.id;

        if (!id) {
            return NextResponse.json({ erro: "ID do aluno é obrigatório." }, { status: 400 });
        }

        const sql = db.prepare(`DELETE FROM alunos WHERE id_aluno = ?`);
        const info = sql.run(id);

        if (info.changes === 0) {
            return NextResponse.json({ erro: "Aluno não encontrado para exclusão." }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Aluno excluído com sucesso!" });
    } catch (error) {
        console.error('Erro ao excluir o aluno:', error);
        return NextResponse.json({ erro: "Erro ao excluir o aluno." }, { status: 500 });
    }
}