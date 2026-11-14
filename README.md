# VitrineIA — Inteligência de consumo para shoppings

Frontend demonstrativo em Next.js, com dados fictícios e camada de integração preparada para um backend Python (FastAPI recomendado).

## Requisitos
- Node.js 20.9 ou superior
- npm

## Executar no Windows (PowerShell) ou macOS/Linux

```bash
npm install
```

Crie `.env.local` copiando o conteúdo de `.env.example` (ou renomeie uma cópia do arquivo):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_USE_MOCKS=true
```

Inicie o projeto:

```bash
npm run dev
```

Acesse http://localhost:3000.

## O que o protótipo apresenta
- Dashboard do shopping centrado em inteligência de consumo: consumidores cadastrados, recorrência, resgate de cupons e satisfação declarada.
- Tendências agregadas de visitação e interesses.
- Segmentos e preferências informadas voluntariamente.
- Oportunidades baseadas em afinidades entre categorias, sem expor dados pessoais.
- Campanhas, alcance e resgate de benefícios.
- Vitrine de cupons e experiência demonstrativa da Sexta 13.
- Dados fictícios centralizados em `src/mocks/data.ts`.
- Contratos TypeScript em `src/types/index.ts` e serviços desacoplados em `src/lib/api.ts`.

## Integração com backend Python

Configure `NEXT_PUBLIC_API_URL`. Com `NEXT_PUBLIC_USE_MOCKS=true`, o frontend usa os dados demonstrativos quando a API não estiver disponível.

| Método | Endpoint | Retorno |
|---|---|---|
| GET | `/dashboard` | `DashboardData` |
| GET | `/consumers/segments` | `ConsumerSegment[]` |
| GET | `/opportunities` | `Opportunity[]` |
| GET | `/campaigns` | `Campaign[]` |
| GET | `/rewards` | `RewardSummary` |
| POST | `/coupons/redeem` | `{ success, message }` |

### Exemplo de resposta para `GET /dashboard`

```json
{
  "registeredConsumers": 24580,
  "consumerChange": 14.6,
  "returningRate": 68,
  "returningChange": 5.2,
  "couponRedemptions": 1840,
  "redemptionChange": 18.4,
  "satisfactionScore": 4.7,
  "satisfactionChange": 0.3,
  "visitSeries": [
    { "day": "Seg", "visits": 3200, "returning": 2100 }
  ],
  "interestSeries": [
    { "name": "Moda e vestuário", "value": 85, "color": "#3157D5" }
  ],
  "recentActivity": [
    { "id": "a1", "title": "Cupom resgatado", "description": "Campanha Look de Verão", "time": "Há 8 min", "type": "coupon" }
  ]
}
```

## Perfis de acesso e privacidade
A interface atual é uma demonstração do painel administrativo do shopping. Para produção, implementar autenticação e autorização no backend com, no mínimo, os perfis:
- **Shopping:** indicadores coletivos e agregados; sem faturamento ou vendas individualizadas por loja.
- **Lojista:** apenas dados da própria loja, campanhas, cupons e métricas que a loja autorizou compartilhar.
- **Consumidor:** seus próprios dados, preferências, consentimentos e benefícios.

Não basta ocultar telas no frontend: toda autorização deve ser validada no backend. Defina finalidade, base legal, retenção, controles de acesso e transparência conforme a LGPD. Evite expor grupos muito pequenos que permitam inferir a identidade ou o comportamento de uma pessoa. O painel não deve revelar dados pessoais nem informações comerciais individuais sem autorização apropriada.

## Observações
- Todos os dados são fictícios e servem apenas para demonstração.
- Visitação, recorrência, satisfação e interesses precisam de metodologia e origem documentadas antes de serem usados como indicadores reais.
- A Sexta 13 é uma campanha demonstrativa. A ativação real, as regras de desconto, limites e elegibilidade devem ser controlados pelo backend e pelas lojas participantes.
