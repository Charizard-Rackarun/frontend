"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Save, Sparkles, Trash2, Wand2 } from "lucide-react";
import { api } from "@/lib/api";
import { errorMessage } from "@/lib/hooks";
import { PageHeading } from "@/components/ui";
import { Alert, Field, Spinner, btnGhost, btnPrimary, inputCls } from "@/components/form";
import type { Dimensao, TipoPergunta } from "@/types";

type PerguntaForm = { texto: string; tipo: TipoPergunta; dimensao: Dimensao | ""; opcoes: string[] };

const LIMITES = { perguntas: 15, opcoesMin: 2, opcoesMax: 12 };
const vazia = (): PerguntaForm => ({ texto: "", tipo: "unica", dimensao: "", opcoes: ["", ""] });

// Modelo pronto: as perguntas com dimensão "categoria" são as que alimentam segmentos e oportunidades
const MODELO: { titulo: string; descricao: string; perguntas: PerguntaForm[] } = {
  titulo: "O que você procura hoje?",
  descricao: "Responda em 30 segundos e ganhe pontos para trocar por cupons.",
  perguntas: [
    { texto: "Quais categorias mais interessam você?", tipo: "multipla", dimensao: "categoria", opcoes: ["Moda", "Beleza", "Alimentação", "Tecnologia", "Casa e decoração"] },
    { texto: "Com que frequência você visita o shopping?", tipo: "unica", dimensao: "frequencia", opcoes: ["Todo dia", "Toda semana", "Todo mês", "Raramente"] },
  ],
};

export default function NovoQuestionarioPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState(10);
  const [perguntas, setPerguntas] = useState<PerguntaForm[]>([vazia()]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const patch = (i: number, p: Partial<PerguntaForm>) =>
    setPerguntas((qs) => qs.map((q, idx) => (idx === i ? { ...q, ...p } : q)));
  const setOpcao = (i: number, j: number, texto: string) =>
    setPerguntas((qs) => qs.map((q, idx) => (idx === i ? { ...q, opcoes: q.opcoes.map((o, k) => (k === j ? texto : o)) } : q)));

  function usarModelo() {
    setTitulo(MODELO.titulo);
    setDescricao(MODELO.descricao);
    setPerguntas(MODELO.perguntas.map((p) => ({ ...p, opcoes: [...p.opcoes] })));
  }

  function validar(): string | null {
    if (titulo.trim().length < 3) return "Dê um título ao questionário (mínimo 3 caracteres).";
    if (pontos < 1 || pontos > 100) return "Os pontos por resposta devem ficar entre 1 e 100.";
    for (const [i, q] of perguntas.entries()) {
      if (q.texto.trim().length < 3) return `Escreva o texto da pergunta ${i + 1}.`;
      const opcoes = q.opcoes.map((o) => o.trim()).filter(Boolean);
      if (opcoes.length < LIMITES.opcoesMin) return `A pergunta ${i + 1} precisa de pelo menos ${LIMITES.opcoesMin} opções preenchidas.`;
      if (new Set(opcoes.map((o) => o.toLowerCase())).size !== opcoes.length) return `A pergunta ${i + 1} tem opções repetidas.`;
    }
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const problema = validar();
    if (problema) return setError(problema);
    setError("");
    setBusy(true);
    try {
      await api.createQuestionario({
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        pontos,
        perguntas: perguntas.map((q) => ({
          texto: q.texto.trim(),
          tipo: q.tipo,
          dimensao: q.dimensao || null,
          opcoes: q.opcoes.map((o) => o.trim()).filter(Boolean).map((texto) => ({ texto })),
        })),
      });
      router.push("/questionarios");
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  const temCategoria = perguntas.some((q) => q.dimensao === "categoria");

  return (
    <>
      <Link href="/questionarios" className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Voltar</Link>
      <PageHeading
        eyebrow="PESQUISAS"
        title="Novo questionário"
        description="Monte as perguntas que os visitantes vão responder."
        action={<button type="button" onClick={usarModelo} className={btnGhost}><Wand2 size={14} /> Usar modelo de interesses</button>}
      />
      <form onSubmit={onSubmit} className="max-w-3xl space-y-5">
        {error && <Alert>{error}</Alert>}

        <section className="card space-y-4 p-5 md:p-6">
          <Field label="Título">
            <input className={inputCls} maxLength={120} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: O que você procura hoje?" />
          </Field>
          <Field label="Descrição (opcional)">
            <input className={inputCls} maxLength={300} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Uma frase para convidar o visitante" />
          </Field>
          <Field label="Pontos por resposta" hint="Quanto o visitante ganha ao concluir (de 1 a 100). Em Sexta 13 vale em dobro.">
            <input className={`${inputCls} max-w-[140px]`} type="number" min={1} max={100} value={pontos} onChange={(e) => setPontos(Number(e.target.value))} />
          </Field>
        </section>

        {perguntas.map((q, i) => (
          <section key={i} className="card space-y-4 p-5 md:p-6">
            <div className="flex items-center justify-between">
              <span className="pill bg-blue-50 text-brand">Pergunta {i + 1}</span>
              {perguntas.length > 1 && (
                <button type="button" onClick={() => setPerguntas((qs) => qs.filter((_, idx) => idx !== i))} className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-rose-600"><Trash2 size={13} /> Remover</button>
              )}
            </div>
            <Field label="Texto da pergunta">
              <input className={inputCls} maxLength={200} value={q.texto} onChange={(e) => patch(i, { texto: e.target.value })} placeholder="Ex.: Quais categorias mais interessam você?" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tipo de resposta">
                <select className={inputCls} value={q.tipo} onChange={(e) => patch(i, { tipo: e.target.value as TipoPergunta })}>
                  <option value="unica">Escolha única</option>
                  <option value="multipla">Múltipla escolha</option>
                </select>
              </Field>
              <Field label="Uso na análise">
                <select className={inputCls} value={q.dimensao} onChange={(e) => patch(i, { dimensao: e.target.value as Dimensao | "" })}>
                  <option value="">Só coletar</option>
                  <option value="categoria">Interesses (gera segmentos)</option>
                  <option value="frequencia">Frequência de visita</option>
                </select>
              </Field>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold text-slate-600">Opções</div>
              <div className="space-y-2">
                {q.opcoes.map((o, j) => (
                  <div key={j} className="flex gap-2">
                    <input className={inputCls} maxLength={80} value={o} onChange={(e) => setOpcao(i, j, e.target.value)} placeholder={`Opção ${j + 1}`} />
                    {q.opcoes.length > LIMITES.opcoesMin && (
                      <button type="button" aria-label="Remover opção" onClick={() => patch(i, { opcoes: q.opcoes.filter((_, k) => k !== j) })} className="rounded-xl px-3 text-slate-300 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={15} /></button>
                    )}
                  </div>
                ))}
              </div>
              {q.opcoes.length < LIMITES.opcoesMax && (
                <button type="button" onClick={() => patch(i, { opcoes: [...q.opcoes, ""] })} className="mt-3 flex items-center gap-1 text-xs font-bold text-brand"><Plus size={14} /> Adicionar opção</button>
              )}
            </div>
          </section>
        ))}

        {perguntas.length < LIMITES.perguntas && (
          <button type="button" onClick={() => setPerguntas((qs) => [...qs, vazia()])} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 py-4 text-xs font-bold text-slate-500 hover:border-brand hover:text-brand"><Plus size={15} /> Adicionar pergunta</button>
        )}

        {!temCategoria && (
          <Alert kind="info">
            <span className="flex items-center gap-1.5"><Sparkles size={13} /> Dica:</span> marque ao menos uma pergunta como “Interesses (gera segmentos)”. Só essas respostas alimentam as telas de Consumidores e Oportunidades.
          </Alert>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={busy} className={btnPrimary}>{busy ? <Spinner /> : <Save size={15} />} Publicar questionário</button>
          <Link href="/questionarios" className={btnGhost}>Cancelar</Link>
        </div>
      </form>
    </>
  );
}
