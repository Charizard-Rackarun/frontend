"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Gift, Moon, QrCode, Sparkles, Ticket } from "lucide-react";
import { api } from "@/lib/api";
import { errorMessage, useFetch } from "@/lib/hooks";
import { PageHeading } from "@/components/ui";
import { Alert, Spinner } from "@/components/form";

export default function RewardsPage() {
  const rewards = useFetch(() => api.getRewards());
  const evento = useFetch(() => api.getSexta13());
  const [resgatando, setResgatando] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{ ok: boolean; msg: string; codigo?: string | null } | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function resgatar(code: string) {
    setResultado(null);
    setResgatando(code);
    try {
      const r = await api.redeemCoupon(code);
      setResultado({ ok: r.success, msg: r.message, codigo: r.resgateCodigo });
      rewards.reload();
    } catch (e) {
      setResultado({ ok: false, msg: errorMessage(e) });
    } finally {
      setResgatando(null);
    }
  }

  async function copiar(codigo: string) {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch { /* sem permissão de área de transferência */ }
  }

  const data = rewards.data;
  if (rewards.error && !data) return <Alert>{rewards.error}</Alert>;
  if (!data) return <div className="h-64 animate-pulse rounded-2xl bg-white" />;

  const semPontos = data.points === 0;
  const progress = data.nextLevelPoints > 0 ? Math.min(100, (data.points / data.nextLevelPoints) * 100) : 100;
  const faltam = Math.max(0, data.nextLevelPoints - data.points);
  const ev = evento.data;

  return (
    <>
      <PageHeading eyebrow="VITRINEIA REWARDS" title="Benefícios para consumidores" description="Uma experiência de fidelidade que conecta pessoas às ofertas das lojas." />

      {ev && (
        <div className={`mb-6 flex items-start gap-3 rounded-2xl border p-4 ${ev.ativo ? "border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 text-white" : "border-violet-100 bg-violet-50 text-violet-900"}`}>
          <Moon size={20} className="mt-0.5 shrink-0" />
          <div>
            <div className="text-sm font-extrabold">{ev.nome}</div>
            <p className={`mt-0.5 text-xs leading-relaxed ${ev.ativo ? "text-violet-100" : "text-violet-800"}`}>{ev.mensagem}</p>
          </div>
        </div>
      )}

      <section className="relative mb-6 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#273b87] via-[#3157D5] to-[#7658D6] p-6 text-white shadow-soft md:p-8">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-100"><Sparkles size={15} /> CLUBE DE BENEFÍCIOS</div>
            <h2 className="mt-3 text-2xl font-extrabold">Cada descoberta vale uma recompensa.</h2>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-blue-100/80">Participe de pesquisas, explore ofertas e acumule pontos para desbloquear benefícios especiais.</p>
            <div className="mt-6 max-w-sm">
              <div className="mb-2 flex justify-between text-[10px] text-blue-100"><span>Nível {data.level}</span><span>{data.points} / {data.nextLevelPoints} pontos</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} /></div>
              <div className="mt-2 text-[10px] text-blue-100/70">{faltam > 0 ? `${faltam} pontos para o próximo nível` : "Você está no nível máximo!"}</div>
            </div>
          </div>
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/10"><Gift size={54} strokeWidth={1.3} /></div>
        </div>
      </section>

      {semPontos && (
        <div className="mb-6"><Alert kind="info">Você ainda não tem pontos. Responda um questionário de uma loja (use o link ou QR code que recebeu) para ganhar pontos e trocar por cupons.</Alert></div>
      )}

      {resultado && (
        <div className="mb-6">
          <Alert kind={resultado.ok ? "success" : "error"}>
            {resultado.msg}
            {resultado.ok && resultado.codigo && (
              <button onClick={() => copiar(resultado.codigo!)} className="mt-2 flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">
                {copiado ? <Check size={13} /> : <Copy size={13} />} {resultado.codigo}
              </button>
            )}
          </Alert>
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <div><h2 className="font-bold text-ink">Cupons disponíveis</h2><p className="mt-1 text-xs text-slate-400">Troque seus pontos e apresente o código na loja</p></div>
        <span className="pill bg-blue-50 text-brand">{data.coupons.length} ofertas</span>
      </div>

      {data.coupons.length === 0 ? (
        <div className="card px-6 py-12 text-center text-xs text-slate-400">Nenhum cupom disponível no momento. Volte em breve!</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.coupons.map((c) => {
            const semSaldo = c.costPoints !== undefined && data.points < c.costPoints;
            return (
              <article key={c.id} className="card overflow-hidden">
                <div className="flex items-center justify-between bg-slate-50 px-5 py-4">
                  <span className="pill bg-white text-slate-500">{c.category}</span>
                  <Ticket size={18} className="text-brand" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-400">{c.store}</div>
                  <h3 className="mt-1 font-bold text-ink">{c.title}</h3>
                  <div className="my-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-4 text-center">
                    <div className="text-3xl font-extrabold text-brand">{c.discount}</div>
                    <div className="mt-1 text-[10px] text-slate-500">{c.description}</div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Válido até {c.expires}</span>
                    {c.costPoints !== undefined && <span className="font-bold text-slate-600">{c.costPoints} pontos</span>}
                  </div>
                  <button onClick={() => resgatar(c.code)} disabled={resgatando !== null || semPontos || semSaldo} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                    {resgatando === c.code ? <Spinner /> : <QrCode size={15} />} {semPontos ? "Ganhe pontos para resgatar" : semSaldo ? "Pontos insuficientes" : "Resgatar cupom"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {semPontos && <p className="mt-6 text-center text-[11px] text-slate-400">Tem um link de questionário? Abra-o no navegador para começar. <Link href="/login" className="font-bold text-brand">Sou lojista</Link></p>}
    </>
  );
}
