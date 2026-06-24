# Operação Shape

Dashboard de acompanhamento de emagrecimento para o casal. Métricas, fichas de treino, sistema de XP e check-in diário.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Recharts 3
- TypeScript
- localStorage (sem backend)

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Dashboard principal (visão geral do casal) |
| `/rapha` | Página do Rapha (treinos + métricas) |
| `/ela` | Página dela (cardio + métricas) |
| `/treinos` | Fichas de treino detalhadas com marcar como feito |
| `/habitos` | Regras, XP, níveis e conquistas |
| `/checkin` | Check-in diário rápido |

## Rodar localmente

```bash
npm install
npm run dev
```

Abrir em `http://localhost:3000`.

## Deploy na Vercel

**Opção 1 — via CLI:**

```bash
npm i -g vercel
vercel deploy
```

**Opção 2 — via GitHub (recomendado):**

1. Suba o projeto para um repositório GitHub
2. Acesse vercel.com e importe o repositório
3. Deploy automático a cada push na `main`

O projeto é 100% estático (sem backend), então o plano Hobby da Vercel é gratuito.

## Backup dos dados

Os dados ficam no `localStorage` do navegador. Para não perder ao limpar o browser:

- Acesse `/habitos` → botão **Exportar JSON**
- Salve o arquivo

## Estrutura

```
app/               → páginas (App Router)
components/        → componentes reutilizáveis
components/charts/ → gráficos Recharts
hooks/             → useAppState (estado global + localStorage)
lib/               → xp.ts, streak.ts, trophies.ts
data/              → treinos.ts (fichas de treino)
```
