export type SalesPoint = { month: string; revenue: number; orders: number };
export type CategoryPoint = { name: string; value: number; color: string };
export type Activity = { id: string; title: string; description: string; time: string; type: "coupon" | "sale" | "consumer" | "campaign" };
export type DashboardData = {
  revenue: number; revenueChange: number; orders: number; ordersChange: number;
  averageTicket: number; averageTicketChange: number; activeConsumers: number; consumerChange: number;
  salesSeries: SalesPoint[]; categorySeries: CategoryPoint[]; recentActivity: Activity[];
};
export type ConsumerSegment = { id: string; name: string; count: number; percentage: number; trend: number; color: string; interests: string[] };
export type Opportunity = { id: string; title: string; description: string; stores: string[]; potential: string; confidence: number; category: string; priority: "Alta" | "Média" | "Baixa" };
export type Campaign = { id: string; name: string; store: string; type: string; status: "Ativa" | "Agendada" | "Encerrada"; reach: number; redemptions: number; startDate: string; endDate: string; discount: string };
export type Reward = { id: string; title: string; store: string; description: string; discount: string; category: string; expires: string; code: string };
export type RewardSummary = { points: number; level: string; nextLevelPoints: number; coupons: Reward[] };
