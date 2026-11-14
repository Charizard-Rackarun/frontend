"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Activity, BarChart3, Bell, ChevronDown, CircleHelp, Gift, Lightbulb, Megaphone, Search, Settings, ShoppingBag, Sparkles, Users, Zap } from "lucide-react";

const nav = [
  { label: "Visão geral", href: "/", icon: BarChart3, group: "WORKSPACE" },
  { label: "Consumidores", href: "/consumidores", icon: Users },
  { label: "Oportunidades", href: "/oportunidades", icon: Lightbulb },
  { label: "Campanhas", href: "/campanhas", icon: Megaphone },
  { label: "Rewards", href: "/rewards", icon: Gift, group: "ENGAJAMENTO" }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <aside className="hidden lg:flex w-[252px] shrink-0 flex-col border-r border-slate-100 bg-white px-5 py-6">
        <Link href="/" className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-blue-200"><Sparkles size={21}/></div>
          <div><div className="font-[Manrope] text-[19px] font-extrabold tracking-tight">Vitrine<span className="text-brand">IA</span></div><div className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Inteligência de consumo</div></div>
        </Link>
        <div className="mb-3 px-3 text-[10px] font-bold tracking-[.16em] text-slate-400">WORKSPACE</div>
        <nav className="space-y-1">
          {nav.slice(0,4).map(item => { const Icon = item.icon; return <Link key={item.href} href={item.href} className={`sidebar-link ${pathname === item.href ? "active" : ""}`}><Icon size={17}/>{item.label}</Link>; })}
        </nav>
        <div className="mb-3 mt-8 px-3 text-[10px] font-bold tracking-[.16em] text-slate-400">ENGAJAMENTO</div>
        <nav className="space-y-1">
          {nav.slice(4).map(item => { const Icon = item.icon; return <Link key={item.href} href={item.href} className={`sidebar-link ${pathname === item.href ? "active" : ""}`}><Icon size={17}/>{item.label}<span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-violet-600">BETA</span></Link>; })}
        </nav>
        <div className="mt-auto space-y-1 border-t border-slate-100 pt-5">
          <a className="sidebar-link" href="#"><Settings size={17}/> Configurações</a>
          <a className="sidebar-link" href="#"><CircleHelp size={17}/> Central de ajuda</a>
          <div className="mt-4 rounded-2xl bg-[#f4f6ff] p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-brand"><Zap size={14}/> VitrineIA Insights</div>
            <p className="text-[11px] leading-relaxed text-slate-500">Entenda tendências de consumo sem expor dados individuais.</p>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-100 bg-white/90 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400"><ShoppingBag size={16}/><span className="hidden sm:inline">Shopping Central</span><span className="text-slate-300">/</span><span className="font-semibold text-slate-700">Painel do shopping</span></div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-400 md:flex"><Search size={14}/> Buscar... <kbd className="ml-8 rounded bg-white px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div>
            <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-50"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500"/></button>
            <div className="flex items-center gap-2 border-l border-slate-100 pl-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-brand">AC</div><div className="hidden sm:block"><div className="text-xs font-bold text-slate-700">Admin Comercial</div><div className="text-[10px] text-slate-400">Administrador</div></div><ChevronDown size={14} className="text-slate-400"/></div>
          </div>
        </header>
        <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-8 md:py-9">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {nav.map(item => { const Icon = item.icon; return <Link key={item.href} href={item.href} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${pathname===item.href ? "bg-brand text-white" : "bg-white text-slate-500"}`}><Icon size={15}/>{item.label}</Link>; })}
          </div>
          {children}
          <footer className="mt-12 flex flex-col justify-between gap-2 border-t border-slate-200/70 pt-5 text-[11px] text-slate-400 sm:flex-row"><span>© 2026 VitrineIA · Protótipo demonstrativo</span><span>Dados fictícios · Ambiente de desenvolvimento</span></footer>
        </div>
      </main>
    </div>
  );
}
