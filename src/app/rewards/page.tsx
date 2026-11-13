"use client";
import { useEffect, useState } from "react";
import { Check, Copy, Gift, QrCode, Sparkles, Ticket } from "lucide-react";
import { api } from "@/lib/api";
import type { RewardSummary } from "@/types";
import { PageHeading } from "@/components/ui";

export default function RewardsPage() {
 const [data,setData]=useState<RewardSummary|null>(null);
 const [message,setMessage]=useState("");
 useEffect(()=>{api.getRewards().then(setData)},[]);
 async function redeem(code:string) { const result=await api.redeemCoupon(code); setMessage(result.message); }
 if(!data) return <div className="h-64 animate-pulse rounded-2xl bg-white"/>;
 const progress=Math.min(100,data.points/data.nextLevelPoints*100);
 return <>
  <PageHeading eyebrow="VITRINEIA REWARDS" title="Benefícios para consumidores" description="Uma experiência de fidelidade que conecta pessoas às ofertas das lojas."/>
  <section className="relative mb-6 overflow-hidden rounded-[22px] bg-gradient-to-br from-[#273b87] via-[#3157D5] to-[#7658D6] p-6 text-white shadow-soft md:p-8"><div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10"/><div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center"><div><div className="flex items-center gap-2 text-xs font-bold text-blue-100"><Sparkles size={15}/> CLUBE DE BENEFÍCIOS</div><h2 className="mt-3 text-2xl font-extrabold">Cada descoberta vale uma recompensa.</h2><p className="mt-2 max-w-lg text-xs leading-relaxed text-blue-100/80">Participe de pesquisas, explore ofertas e acumule pontos para desbloquear benefícios especiais.</p><div className="mt-6 max-w-sm"><div className="mb-2 flex justify-between text-[10px] text-blue-100"><span>Nível {data.level}</span><span>{data.points} / {data.nextLevelPoints} pontos</span></div><div className="h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white" style={{width:`${progress}%`}}/></div><div className="mt-2 text-[10px] text-blue-100/70">{data.nextLevelPoints-data.points} pontos para o próximo nível</div></div></div><div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/10"><Gift size={54} strokeWidth={1.3}/></div></div></section>
  <div className="mb-5 flex items-center justify-between"><div><h2 className="font-bold text-ink">Cupons disponíveis</h2><p className="mt-1 text-xs text-slate-400">Benefícios fictícios para demonstração</p></div><span className="pill bg-blue-50 text-brand">{data.coupons.length} ofertas</span></div>
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.coupons.map(c=><article key={c.id} className="card overflow-hidden"><div className="flex items-center justify-between bg-slate-50 px-5 py-4"><span className="pill bg-white text-slate-500">{c.category}</span><Ticket size={18} className="text-brand"/></div><div className="p-5"><div className="text-xs text-slate-400">{c.store}</div><h3 className="mt-1 font-bold text-ink">{c.title}</h3><div className="my-4 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-4 text-center"><div className="text-3xl font-extrabold text-brand">{c.discount}</div><div className="mt-1 text-[10px] text-slate-500">{c.description}</div></div><div className="flex items-center justify-between text-[10px] text-slate-400"><span>Válido até {c.expires}</span><span className="font-mono font-bold text-slate-600">{c.code}</span></div><button onClick={()=>redeem(c.code)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-white hover:bg-blue-700"><QrCode size={15}/> Validar cupom (demo)</button></div></article>)}</div>
  {message && <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-semibold text-emerald-700"><Check size={16}/>{message}</div>}
  <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-5"><div className="flex items-center gap-2 font-bold text-violet-900"><Sparkles size={17}/> Easter egg: Sexta 13</div><p className="mt-2 text-xs leading-relaxed text-violet-800">Em datas especiais, a VitrineIA pode ativar uma vitrine temática de ofertas secretas. No ambiente demonstrativo, a campanha aparece na área de campanhas; a ativação real deverá ser configurada pelo backend e pelas regras comerciais das lojas.</p></div>
 </>;
}
