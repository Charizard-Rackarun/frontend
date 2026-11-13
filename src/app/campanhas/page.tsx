"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Megaphone, Plus, Ticket, Users } from "lucide-react";
import { api } from "@/lib/api";
import type { Campaign } from "@/types";
import { PageHeading, SectionTitle, StatusPill } from "@/components/ui";

export default function CampaignsPage() {
 const [items,setItems]=useState<Campaign[]>([]);
 useEffect(()=>{api.getCampaigns().then(setItems)},[]);
 return <>
  <PageHeading eyebrow="MARKETING INTELIGENTE" title="Campanhas" description="Acompanhe ações promocionais e o engajamento das lojas participantes." action={<button className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-white"><Plus size={15}/> Nova campanha</button>}/>
  <div className="mb-5 grid gap-4 sm:grid-cols-3">
   <div className="card p-5"><div className="text-xs text-slate-500">Campanhas ativas</div><div className="mt-2 text-3xl font-extrabold">{items.filter(x=>x.status==="Ativa").length}</div></div>
   <div className="card p-5"><div className="text-xs text-slate-500">Alcance total</div><div className="mt-2 text-3xl font-extrabold">{items.reduce((a,b)=>a+b.reach,0).toLocaleString("pt-BR")}</div></div>
   <div className="card p-5"><div className="text-xs text-slate-500">Cupons resgatados</div><div className="mt-2 text-3xl font-extrabold">{items.reduce((a,b)=>a+b.redemptions,0).toLocaleString("pt-BR")}</div></div>
  </div>
  <section className="card overflow-hidden"><div className="p-5"><SectionTitle title="Todas as campanhas" subtitle="Dados de demonstração"/></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Campanha</th><th className="px-4 py-3">Loja</th><th className="px-4 py-3">Período</th><th className="px-4 py-3">Alcance</th><th className="px-4 py-3">Resgates</th><th className="px-4 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-50">{items.map(c=><tr key={c.id} className="text-xs"><td className="px-5 py-4"><div className="font-bold text-slate-700">{c.name}</div><div className="mt-1 text-[10px] text-slate-400">{c.type} · {c.discount}</div></td><td className="px-4 py-4 text-slate-500">{c.store}</td><td className="px-4 py-4 text-slate-500">{c.startDate} – {c.endDate}</td><td className="px-4 py-4 font-semibold text-slate-700">{c.reach.toLocaleString("pt-BR")}</td><td className="px-4 py-4 font-semibold text-slate-700">{c.redemptions}</td><td className="px-4 py-4"><StatusPill status={c.status}/></td></tr>)}</tbody></table></div></section>
  <section className="mt-5 overflow-hidden rounded-2xl bg-[#20172d] p-6 text-white"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><span className="pill bg-fuchsia-400/15 text-fuchsia-200"><CalendarDays size={12}/> EVENTO TEMÁTICO</span><h2 className="mt-3 text-2xl font-extrabold">Sexta 13 · Ofertas Secretas</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-violet-100/70">Uma experiência especial com cupons limitados e ofertas das lojas participantes. Campanha demonstrativa configurada para 13/11/2026.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"><div className="text-[10px] font-bold tracking-widest text-fuchsia-200">DESCONTOS DE ATÉ</div><div className="my-1 text-5xl font-extrabold text-fuchsia-300">50%</div><div className="text-[10px] text-violet-100/60">Conforme regras de cada loja</div></div></div></section>
 </>;
}
