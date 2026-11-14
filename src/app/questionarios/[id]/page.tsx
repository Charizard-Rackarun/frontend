"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, Copy, ShieldCheck, Users } from "lucide-react";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/hooks";
import { PageHeading } from "@/components/ui";
import { Alert, PageSkeleton, btnGhost } from "@/components/form";

export default function ResultadosPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data, error, loading } = useFetch(() => api.getResultados(id), [id]);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const link = `${window.location.origin}/responder/${id}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copie o link do questionário:", link);
    }
  }

  return (
    <>
      <Link href="/questionarios" className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Questionários</Link>
      <PageHeading
        eyebrow={`QUESTIONÁRIO #${id}`}
        title="Resultados"
        description="Distribuição das respostas, sempre de forma agregada e anônima."
        action={<button onClick={copyLink} className={btnGhost}>{copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar link para visitantes</>}</button>}
      />
      {error && <Alert>{error}</Alert>}
      {loading && !data && <PageSkeleton />}
      {data && (
        <div className="max-w-3xl space-y-5">
          <div className="card flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand"><Users size={20} /></div>
            <div><div className="text-2xl font-extrabold text-ink">{data.totalRespostas}</div><div className="text-xs text-slate-400">respostas recebidas</div></div>
          </div>

          {data.suprimido && (
            <Alert kind="info">
              <span className="flex items-center gap-1.5 font-bold"><ShieldCheck size={14} /> Resultados protegidos (LGPD)</span>
              <span className="mt-1 block font-normal">Com poucas respostas os números ficam ocultos para que ninguém seja identificado. Eles aparecem automaticamente quando houver respostas suficientes.</span>
            </Alert>
          )}

          {data.perguntas.map((p, i) => (
            <section key={p.perguntaId} className="card p-5 md:p-6">
              <div className="text-[11px] font-bold text-slate-400">PERGUNTA {i + 1}</div>
              <h3 className="mt-1 font-bold text-ink">{p.texto}</h3>
              <div className="mt-4 space-y-3.5">
                {p.opcoes.map((o) => (
                  <div key={o.opcaoId}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-semibold text-slate-600">{o.texto}</span>
                      <span className="text-slate-400">{o.percentual === null ? "—" : `${o.percentual.toFixed(1).replace(".", ",")}% · ${o.total}`}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${o.percentual ?? 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
