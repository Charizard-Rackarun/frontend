import { ReactNode } from "react";

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <div className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-brand">{eyebrow}</div>}<h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-[30px]">{title}</h1><p className="mt-1.5 text-sm text-slate-500">{description}</p></div>{action}</div>;
}
export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-sm font-bold text-ink">{title}</h2>{subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}</div>{action}</div>;
}
export function StatCard({ label, value, change, icon, accent = "blue" }: { label: string; value: string; change: number; icon: ReactNode; accent?: string }) {
  const accents: Record<string,string> = { blue:"bg-blue-50 text-blue-600", violet:"bg-violet-50 text-violet-600", green:"bg-emerald-50 text-emerald-600", amber:"bg-amber-50 text-amber-600" };
  return <div className="card p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{label}</span><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accents[accent] || accents.blue}`}>{icon}</span></div><div className="mt-4 flex items-end justify-between gap-2"><strong className="font-[Manrope] text-[25px] font-extrabold tracking-tight text-ink">{value}</strong><span className={`pill ${change >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{change >= 0 ? "+" : ""}{change}%</span></div><div className="mt-1 text-[10px] text-slate-400">em relação ao período anterior</div></div>;
}
export function StatusPill({ status }: { status: string }) {
  const styles: Record<string,string> = { Ativa:"bg-emerald-50 text-emerald-700", Agendada:"bg-blue-50 text-blue-700", Encerrada:"bg-slate-100 text-slate-500", Alta:"bg-rose-50 text-rose-600", Média:"bg-amber-50 text-amber-700", Baixa:"bg-slate-100 text-slate-500" };
  return <span className={`pill ${styles[status] || "bg-slate-100 text-slate-600"}`}>{status}</span>;
}
