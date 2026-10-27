import db from "../../db/banco";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const notas = db.prepare(`
            SELECT notas.rowid AS id_nota, notas.aluno_id, alunos.nome, alunos.ra, notas.t1, notas.t2, notas.n1, notas.n2, notas.n3 
            FROM notas
            INNER JOIN alunos ON notas.aluno_id = alunos.id_aluno
            ORDER BY alunos.nome
        `).all();

        return NextResponse.json(notas);
    } catch (error) {
        console.error('Erro no GET /api/notas:', error);
        return NextResponse.json({ erro: "Erro ao buscar notas." }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const dados = await request.json();
        const aluno_id = dados.aluno_id || dados.id_aluno;

        if (!aluno_id) {
            return NextResponse.json({ erro: "O ID do aluno é obrigatório." }, { status: 400 });
        }

        const alunoExiste = db.prepare('SELECT id_aluno FROM alunos WHERE id_aluno = ?').get(aluno_id);
        if (!alunoExiste) {
            return NextResponse.json({ erro: "Aluno não encontrado." }, { status: 404 });
        }

        const sql = db.prepare(`INSERT INTO notas (aluno_id, t1, t2, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?)`);
        const info = sql.run(
            aluno_id,
            dados.t1 ?? dados.trabalho1 ?? null,
            dados.t2 ?? dados.trabalho2 ?? null,
            dados.n1 ?? dados.nota1 ?? null,
            dados.n2 ?? dados.nota2 ?? null,
            dados.n3 ?? dados.nota3 ?? null
        );

        return NextResponse.json({
            mensagem: 'Nota salva com sucesso!',
            id_nota: info.lastInsertRowid
        }, { status: 201 });
    } catch (error) {
        console.error('Erro ao salvar nota:', error);
        return NextResponse.json({ erro: "Erro ao cadastrar nota." }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const dados = await request.json();
        const id_nota = dados.id_nota || dados.id;

        if (!id_nota) {
            return NextResponse.json({ erro: "ID da nota é obrigatório." }, { status: 400 });
        }

        const sql = db.prepare(`
            UPDATE notas
            SET t1 = ?, t2 = ?, n1 = ?, n2 = ?, n3 = ?
            WHERE rowid = ?
        `);

        const info = sql.run(
            dados.t1 ?? dados.trabalho1 ?? null,
            dados.t2 ?? dados.trabalho2 ?? null,
            dados.n1 ?? dados.nota1 ?? null,
            dados.n2 ?? dados.nota2 ?? null,
            dados.n3 ?? dados.nota3 ?? null,
            id_nota
        );

        if (info.changes === 0) {
            return NextResponse.json({ erro: "Registro de nota não encontrado para atualização." }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Nota atualizada com sucesso!" });
    } catch (error) {
        console.error('Erro ao editar a nota:', error);
        return NextResponse.json({ erro: "Erro ao editar a nota." }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id_nota = dados.id_nota || dados.id;

        if (!id_nota) {
            return NextResponse.json({ erro: "ID da nota é obrigatório." }, { status: 400 });
        }

        const sql = db.prepare(`DELETE FROM notas WHERE rowid = ?`);
        const info = sql.run(id_nota);

        if (info.changes === 0) {
            return NextResponse.json({ erro: "Registro de nota não encontrado para exclusão." }, { status: 404 });
        }

        return NextResponse.json({ mensagem: "Nota excluída com sucesso!" });
    } catch (error) {
        console.error('Erro ao excluir a nota:', error);
        return NextResponse.json({ erro: "Erro ao excluir a nota." }, { status: 500 });
    }
}