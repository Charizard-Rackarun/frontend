"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Gift, PartyPopper, Send } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { errorMessage, useFetch } from "@/lib/hooks";
import { Alert, Spinner, btnPrimary } from "@/components/form";
import type { RespostaResultado } from "@/types";

export default function ResponderPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: questionario, error, loading } = useFetch(() => api.getQuestionarioPublico(id), [id]);
  const [escolhas, setEscolhas] = useState<Record<number, number[]>>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [jaRespondeu, setJaRespondeu] = useState(false);
  const [resultado, setResultado] = useState<RespostaResultado | null>(null);

  function escolher(perguntaId: number, opcaoId: number, multipla: boolean) {
    setEscolhas((atual) => {
      const marcadas = atual[perguntaId] ?? [];
      if (!multipla) return { ...atual, [perguntaId]: [opcaoId] };
      return { ...atual, [perguntaId]: marcadas.includes(opcaoId) ? marcadas.filter((o) => o !== opcaoId) : [...marcadas, opcaoId] };
    });
  }

  if (loading) return <div className="h-64 animate-pulse rounded-2xl bg-white" />;
  if (error || !questionario) {
    return (
      <div className="card px-6 py-14 text-center">
        <h1 className="font-bold text-ink">Questionário indisponível</h1>
        <p className="mt-2 text-xs text-slate-400">{error ?? "Este questionário não existe ou foi encerrado."}</p>
        <Link href="/rewards" className="mt-5 inline-block text-xs font-bold text-brand">Ver cupons disponíveis</Link>
      </div>
    );
  }

  const completo = questionario.perguntas.every((p) => (escolhas[p.id]?.length ?? 0) > 0);

  async function enviar() {
    if (!questionario) return;
    setSubmitError("");
    setBusy(true);
    try {
      const r = await api.responder(questionario.id, {
        respostas: questionario.perguntas.map((p) => ({ perguntaId: p.id, opcaoIds: escolhas[p.id] ?? [] })),
      });
      setResultado(r);
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) setJaRespondeu(true);
      else setSubmitError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  if (resultado) {
    return (
      <div className="card mx-auto max-w-lg overflow-hidden text-center">
        <div className="bg-gradient-to-br from-[#273b87] via-[#3157D5] to-[#7658D6] px-6 py-10 text-white">
          <PartyPopper size={44} strokeWidth={1.4} className="mx-auto" />
          <h1 className="mt-4 font-[Manrope] text-2xl font-extrabold">Obrigado por responder!</h1>
          <p className="mt-1 text-sm text-blue-100">Você ganhou</p>
          <div className="mt-1 text-5xl font-extrabold">+{resultado.pontosGanhos}</div>
          <div className="text-xs text-blue-100">pontos</div>
          {resultado.bonusSexta13 && <div className="mx-auto mt-4 w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">Bônus Sexta 13: pontos em dobro!</div>}
        </div>
        <div className="px-6 py-7">
          <p className="text-sm text-slate-500">Seu saldo agora é de <strong className="text-ink">{resultado.pontosTotal} pontos</strong>.</p>
          <Link href="/rewards" className={`${btnPrimary} mt-5`}><Gift size={15} /> Trocar por cupons</Link>
        </div>
      </div>
    );
  }

  if (jaRespondeu) {
    return (
      <div className="card mx-auto max-w-lg px-6 py-14 text-center">
        <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
        <h1 className="mt-4 font-bold text-ink">Você já respondeu este questionário</h1>
        <p className="mt-2 text-xs text-slate-400">Cada pessoa pode responder uma vez. Seus pontos continuam disponíveis para troca.</p>
        <Link href="/rewards" className={`${btnPrimary} mt-5`}><Gift size={15} /> Ver meus pontos e cupons</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <span className="pill bg-blue-50 text-brand">+{questionario.pontos} pontos ao responder</span>
        <h1 className="mt-3 font-[Manrope] text-2xl font-extrabold text-ink">{questionario.titulo}</h1>
        {questionario.descricao && <p className="mt-1.5 text-sm text-slate-400">{questionario.descricao}</p>}
      </div>

      <div className="space-y-5">
        {questionario.perguntas.map((p, i) => {
          const multipla = p.tipo === "multipla";
          return (
            <fieldset key={p.id} className="card p-5 md:p-6">
              <legend className="sr-only">{p.texto}</legend>
              <div className="text-[11px] font-bold text-slate-400">PERGUNTA {i + 1} DE {questionario.perguntas.length}</div>
              <h2 className="mt-1 font-bold text-ink">{p.texto}</h2>
              <p className="mt-0.5 text-[11px] text-slate-400">{multipla ? "Você pode escolher mais de uma opção" : "Escolha uma opção"}</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {p.opcoes.map((o) => {
                  const marcada = escolhas[p.id]?.includes(o.id) ?? false;
                  return (
                    <label key={o.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${marcada ? "border-brand bg-blue-50 font-bold text-brand" : "border-slate-200 text-slate-600 hover:border-blue-200"}`}>
                      <input type={multipla ? "checkbox" : "radio"} name={`p-${p.id}`} checked={marcada} onChange={() => escolher(p.id, o.id, multipla)} className="h-4 w-4 accent-[#3157D5]" />
                      {o.texto}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {submitError && <div className="mt-5"><Alert>{submitError}</Alert></div>}
      <button onClick={enviar} disabled={!completo || busy} className={`${btnPrimary} mt-6 w-full py-3.5`}>
        {busy ? <Spinner /> : <Send size={15} />} {completo ? "Enviar respostas e ganhar pontos" : "Responda todas as perguntas"}
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-400">Suas respostas são anônimas: não pedimos nome, e-mail ou telefone.</p>
    </div>
  );
}
