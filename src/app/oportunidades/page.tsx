"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, BrainCircuit, Lightbulb, Sparkles, Target } from "lucide-react";
import { api } from "@/lib/api";
import type { Opportunity } from "@/types";
import { PageHeading, StatusPill } from "@/components/ui";

export default function OpportunitiesPage() {
 const [items,setItems]=useState<Opportunity[]>([]);
 useEffect(()=>{api.getOpportunities().then(setItems)},[]);
 return <>
  <PageHeading eyebrow="INTELIGÊNCIA COMERCIAL" title="Oportunidades" description="Conexões entre segmentos que podem se transformar em novas vendas." action={<span className="pill bg-violet-50 text-violet-700"><Sparkles size={12}/> Insights demonstrativos</span>}/>
  <div className="mb-5 grid gap-4 sm:grid-cols-3">
   <div className="card p-5"><div className="text-xs text-slate-500">Oportunidades identificadas</div><div className="mt-2 text-3xl font-extrabold">{items.length.toString().padStart(2,"0")}</div></div>
   <div className="card p-5"><div className="text-xs text-slate-500">Prioridade alta</div><div className="mt-2 text-3xl font-extrabold">{items.filter(x=>x.priority==="Alta").length}</div></div>
   <div className="card p-5"><div className="text-xs text-slate-500">Segmentos conectados</div><div className="mt-2 text-3xl font-extrabold">6</div></div>
  </div>
  <div className="mb-4 flex items-center gap-2 text-xs text-slate-500"><BrainCircuit size={16} className="text-violet-600"/> Recomendações geradas a partir de padrões simulados de consumo e vendas.</div>
  <div className="space-y-4">{items.map((o,i)=><article key={o.id} className="card p-5 md:p-6"><div className="flex flex-col justify-between gap-4 md:flex-row"><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><Lightbulb size={20}/></div><div><div className="mb-1 flex flex-wrap items-center gap-2"><h2 className="font-bold text-ink">{o.title}</h2><StatusPill status={o.priority}/></div><p className="max-w-3xl text-xs leading-relaxed text-slate-500">{o.description}</p></div></div><div className="flex shrink-0 items-center gap-2 self-start rounded-xl bg-slate-50 px-3 py-2"><Target size={15} className="text-brand"/><span className="text-xs font-bold text-slate-700">{o.confidence}% de confiança</span></div></div><div className="mt-5 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center"><div><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Lojas sugeridas</div><div className="flex flex-wrap gap-2">{o.stores.map(s=><span key={s} className="rounded-lg bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700">{s}</span>)}</div></div><div className="flex items-center justify-between gap-5"><div><div className="text-[10px] text-slate-400">Tipo de oportunidade</div><div className="mt-1 text-xs font-bold text-slate-700">{o.category}</div></div><button className="flex items-center gap-1 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700">Explorar <ArrowUpRight size={14}/></button></div></div></article>)}</div>
  <p className="mt-4 text-[10px] text-slate-400">Os percentuais são ilustrativos e não representam previsões validadas. Em produção, a confiança deverá ser calculada e calibrada pelo motor analítico.</p>
 </>;
}
