import { dashboardMock, consumerSegmentsMock, opportunitiesMock, campaignsMock, rewardsMock } from "@/mocks/data";
import type { DashboardData, ConsumerSegment, Opportunity, Campaign, RewardSummary } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

async function request<T>(path: string, fallback: T, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options?.headers },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`API ${response.status}: ${response.statusText}`);
    return (await response.json()) as T;
  } catch (error) {
    if (USE_MOCKS) {
      console.info(`[VitrineIA] API indisponível em ${path}; usando dados demonstrativos.`, error);
      return fallback;
    }
    throw error;
  }
}

export const api = {
  getDashboard: () => request<DashboardData>("/dashboard", dashboardMock),
  getConsumerSegments: () => request<ConsumerSegment[]>("/consumers/segments", consumerSegmentsMock),
  getOpportunities: () => request<Opportunity[]>("/opportunities", opportunitiesMock),
  getCampaigns: () => request<Campaign[]>("/campaigns", campaignsMock),
  getRewards: () => request<RewardSummary>("/rewards", rewardsMock),
  redeemCoupon: (code: string) => request<{ success: boolean; message: string }>(
    "/coupons/redeem", { success: true, message: `Cupom ${code} validado no modo demonstração.` },
    { method: "POST", body: JSON.stringify({ code }) }
  )
};
