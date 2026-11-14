import { DashboardData, ConsumerSegment, Opportunity, Campaign, RewardSummary } from "@/types";

// Dados 100% fictícios e agregados. Não representam faturamento nem vendas individuais.
export const dashboardMock: DashboardData = {
  registeredConsumers: 24580, consumerChange: 14.6,
  returningRate: 68, returningChange: 5.2,
  couponRedemptions: 1840, redemptionChange: 18.4,
  satisfactionScore: 4.7, satisfactionChange: 0.3,
  visitSeries: [
    { day: "Seg", visits: 3200, returning: 2100 }, { day: "Ter", visits: 3650, returning: 2390 },
    { day: "Qua", visits: 3420, returning: 2240 }, { day: "Qui", visits: 4100, returning: 2780 },
    { day: "Sex", visits: 5200, returning: 3540 }, { day: "Sáb", visits: 6800, returning: 4690 },
    { day: "Dom", visits: 5900, returning: 4010 }
  ],
  interestSeries: [
    { name: "Moda e vestuário", value: 85, color: "#3157D5" }, { name: "Alimentação", value: 72, color: "#21A67A" },
    { name: "Tecnologia", value: 58, color: "#F0A34A" }, { name: "Beleza", value: 46, color: "#8B6CE8" },
    { name: "Entretenimento", value: 39, color: "#D66C9A" }
  ],
  recentActivity: [
    { id: "1", title: "Cupom resgatado", description: "Campanha Look de Verão · categoria Moda", time: "Há 8 min", type: "coupon" },
    { id: "2", title: "Nova campanha publicada", description: "Festival de Beleza · lojas participantes", time: "Há 32 min", type: "campaign" },
    { id: "3", title: "Pesquisa respondida", description: "Preferências de alimentação e lazer", time: "Há 1 h", type: "survey" },
    { id: "4", title: "Novos consumidores cadastrados", description: "Cadastro voluntário e preferências", time: "Há 2 h", type: "consumer" }
  ]
};

export const consumerSegmentsMock: ConsumerSegment[] = [
  { id: "1", name: "Moda e acessórios", count: 2180, percentage: 35, trend: 12, color: "#3157D5", interests: ["Moda casual", "Calçados", "Acessórios"] },
  { id: "2", name: "Beleza e perfumaria", count: 1560, percentage: 25, trend: 18, color: "#8B6CE8", interests: ["Perfumes", "Skincare", "Maquiagem"] },
  { id: "3", name: "Alimentação", count: 1248, percentage: 20, trend: 7, color: "#21A67A", interests: ["Restaurantes", "Cafeterias", "Lanches"] },
  { id: "4", name: "Tecnologia", count: 749, percentage: 12, trend: -2, color: "#F0A34A", interests: ["Smartphones", "Acessórios", "Games"] },
  { id: "5", name: "Casa e decoração", count: 503, percentage: 8, trend: 5, color: "#AAB4C5", interests: ["Decoração", "Organização", "Utilidades"] }
];

export const opportunitiesMock: Opportunity[] = [
  { id: "1", title: "Moda + Perfumaria", description: "Pesquisas voluntárias mostram que parte do público interessado em moda também declara interesse em beleza. Sugestão: campanha colaborativa com ofertas complementares, sem compartilhar dados individuais.", stores: ["Loja Fashion", "Perfumaria Aura"], potential: "Alto potencial", confidence: 87, category: "Afinidade de interesses", priority: "Alta" },
  { id: "2", title: "Alimentação no horário noturno", description: "A intenção declarada por alimentação cresce no período noturno. Sugestão: divulgar combos para visitantes que optarem por receber ofertas nesse tema.", stores: ["Café Central", "Cine Plaza"], potential: "Oportunidade sazonal", confidence: 79, category: "Padrão de visita", priority: "Média" },
  { id: "3", title: "Tecnologia para público jovem", description: "Respostas agregadas indicam interesse em acessórios mobile e games. Sugestão: campanha temática com adesão voluntária.", stores: ["Tech Store", "Game House"], potential: "Potencial de engajamento", confidence: 72, category: "Preferências declaradas", priority: "Média" }
];

export const campaignsMock: Campaign[] = [
  { id: "1", name: "Festival de Beleza", store: "Perfumaria Aura", type: "Desconto", status: "Ativa", reach: 1840, redemptions: 216, startDate: "10/11/2026", endDate: "20/11/2026", discount: "20%" },
  { id: "2", name: "Look de Verão", store: "Loja Fashion", type: "Cupom", status: "Ativa", reach: 2350, redemptions: 318, startDate: "08/11/2026", endDate: "18/11/2026", discount: "15%" },
  { id: "3", name: "Sexta 13 — Ofertas Secretas", store: "Lojas participantes", type: "Evento especial", status: "Agendada", reach: 0, redemptions: 0, startDate: "13/11/2026", endDate: "13/11/2026", discount: "Até 50%" },
  { id: "4", name: "Tech Week", store: "Tech Store", type: "Desconto", status: "Encerrada", reach: 980, redemptions: 104, startDate: "01/11/2026", endDate: "07/11/2026", discount: "10%" }
];

export const rewardsMock: RewardSummary = {
  points: 680, level: "Caçador de ofertas", nextLevelPoints: 1000,
  coupons: [
    { id: "1", title: "Seu próximo look", store: "Loja Fashion", description: "Em compras acima de R$ 120", discount: "15% OFF", category: "Moda", expires: "20 nov, 2026", code: "LOOK15" },
    { id: "2", title: "Momento perfumado", store: "Perfumaria Aura", description: "Em produtos selecionados", discount: "20% OFF", category: "Beleza", expires: "18 nov, 2026", code: "AURA20" },
    { id: "3", title: "Pausa para um café", store: "Café Central", description: "Na compra de uma bebida + salgado", discount: "R$ 8 OFF", category: "Alimentação", expires: "22 nov, 2026", code: "CAFE8" }
  ]
};
