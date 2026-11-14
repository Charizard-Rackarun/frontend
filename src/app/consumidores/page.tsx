"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Search, Users } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "@/lib/api";
import type { ConsumerSegment } from "@/types";
import { PageHeading, SectionTitle } from "@/components/ui";

export default function ConsumersPage() {
  const [segments,setSegments] = useState<ConsumerSegment[]>([]);
  const [query,setQuery] = useState("");
  useEffect(()=>{api.getConsumerSegments().then(setSegments)},[]);
  const total=segments.reduce((a,b)=>a+b.count,0);
  const filtered=segments.filter(s=>s.name.toLowerCase().includes(query.toLowerCase()));
  return <>
    <PageHeading eyebrow="INTELIGÊNCIA DE CONSUMO" title="Consumidores" description="Entenda os interesses e as tendências do público a partir de dados agregados."/>
    <div className="mb-5 grid gap-4 sm:grid-cols-3">
      <div className="card p-5"><div className="text-xs text-slate-500">Perfis cadastrados (dados agregados)</div><div className="mt-2 text-3xl font-extrabold">{total.toLocaleString("pt-BR")}</div><div className="mt-1 text-[10px] text-emerald-600">+14,6% no período</div></div>
      <div className="card p-5"><div className="text-xs text-slate-500">Segmentos mapeados</div><div className="mt-2 text-3xl font-extrabold">{segments.length}</div><div className="mt-1 text-[10px] text-slate-400">Categorias de interesse</div></div>
      <div className="card p-5"><div className="text-xs text-slate-500">Pesquisas respondidas</div><div className="mt-2 text-3xl font-extrabold">1.284</div><div className="mt-1 text-[10px] text-slate-400">Dados demonstrativos</div></div>
    </div>
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <section className="card p-5"><SectionTitle title="Distribuição de interesses" subtitle="Participação por categoria"/><div className="h-[280px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={segments} dataKey="percentage" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={3}>{segments.map(s=><Cell key={s.id} fill={s.color}/>)}</Pie><Tooltip formatter={(v:any)=>`${v}%`}/></PieChart></ResponsiveContainer></div><p className="text-center text-[11px] text-slate-400">Preferências informadas voluntariamente · Dados fictícios</p></section>
      <section className="card p-5"><SectionTitle title="Segmentos de consumidores" subtitle="Volume agregado, participação e variação"/><div className="mb-4 relative"><Search size={15} className="absolute left-3 top-3 text-slate-400"/><input className="input pl-9" placeholder="Buscar segmento..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="space-y-4">{filtered.map(s=><div key={s.id}><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-bold text-slate-700"><i className="h-2.5 w-2.5 rounded-full" style={{background:s.color}}/>{s.name}</div><div className="text-xs font-bold text-slate-700">{s.count.toLocaleString("pt-BR")}</div></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{width:`${s.percentage}%`,background:s.color}}/></div><div className="mt-1.5 flex justify-between text-[10px] text-slate-400"><span>{s.percentage}% do público</span><span className={s.trend>=0?"text-emerald-600":"text-rose-500"}>{s.trend>0?"+":""}{s.trend}% <ArrowUpRight className="inline" size={11}/></span></div><div className="mt-2 flex flex-wrap gap-1">{s.interests.map(i=><span key={i} className="rounded-md bg-slate-50 px-2 py-1 text-[10px] text-slate-500">{i}</span>)}</div></div>)}</div></section>
    </div>
    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-relaxed text-blue-800"><strong>Privacidade em primeiro lugar:</strong> esta visão utiliza dados fictícios e agregados. Na versão real, os dados deverão ser tratados conforme a LGPD, com transparência sobre finalidades, bases legais e compartilhamentos.</div>
  </>;
}
