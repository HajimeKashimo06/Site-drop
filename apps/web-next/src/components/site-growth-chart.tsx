"use client";

import { motion } from "framer-motion";

const chartPoints = [
  { x: 32, y: 186, amount: "2 400 EUR" },
  { x: 118, y: 166, amount: "6 800 EUR" },
  { x: 204, y: 140, amount: "14 500 EUR" },
  { x: 290, y: 112, amount: "26 900 EUR" },
  { x: 376, y: 78, amount: "43 000 EUR" },
  { x: 462, y: 40, amount: "68 500 EUR" },
] as const;

const axisLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"] as const;
const chartPath = chartPoints.map((point) => `${point.x},${point.y}`).join(" ");
const areaPath = `M ${chartPoints[0].x} 212 L ${chartPoints
  .map((point) => `${point.x} ${point.y}`)
  .join(" L ")} L ${chartPoints[chartPoints.length - 1].x} 212 Z`;

export function SiteGrowthChart() {
  return (
    <div className="mt-8 w-full rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,241,234,0.86))] p-5 shadow-[0_28px_60px_rgba(15,23,42,0.08)] md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            Impact
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
            Un site plus professionnel peut vous aider à générer plus de demandes et plus de chiffre d&apos;affaires.
          </h3>
        </div>

          <div className="grid grid-cols-2 gap-3 md:min-w-[16rem]">
            <div className="rounded-[1.3rem] border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-soft)]">
                Demandes
              </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--ink-strong)]">+214%</p>
          </div>
          <div className="rounded-[1.3rem] border border-[rgba(15,23,42,0.08)] bg-white/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-soft)]">
              CA estimé
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--ink-strong)]">+66 100 EUR</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-[#f9f6ef] p-4 md:p-5">
        <div className="relative overflow-hidden rounded-[1.3rem] bg-[linear-gradient(180deg,#fffdf8,#f4eee2)] p-3 md:p-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,141,68,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(19,58,98,0.1),transparent_42%)]" />

          <svg viewBox="0 0 494 220" className="relative z-10 h-[18rem] w-full overflow-visible md:h-[20rem]">
            <defs>
              <linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(186,141,68,0.28)" />
                <stop offset="100%" stopColor="rgba(186,141,68,0)" />
              </linearGradient>
              <linearGradient id="revenue-line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#8d7447" />
                <stop offset="100%" stopColor="#133a62" />
              </linearGradient>
            </defs>

            {[40, 80, 120, 160, 200].map((y) => (
              <line
                key={y}
                x1="0"
                x2="494"
                y1={y}
                y2={y}
                stroke="rgba(17,24,39,0.08)"
                strokeDasharray="5 7"
              />
            ))}

            <path d={areaPath} fill="url(#revenue-fill)" opacity="0.9" />

            <motion.polyline
              points={chartPath}
              fill="none"
              stroke="url(#revenue-line)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 4.6, times: [0, 0.45, 0.78, 1], repeat: Infinity, ease: "easeInOut" }}
            />

            {chartPoints.map((point, index) => (
              <motion.g
                key={`${point.x}-${point.y}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: [0.55, 1, 0.7, 0.55], scale: [0.9, 1.08, 1, 0.9] }}
                transition={{
                  delay: index * 0.12,
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <circle cx={point.x} cy={point.y} r="9" fill="#fffdf8" stroke="#173a62" strokeWidth="3" />
                <circle cx={point.x} cy={point.y} r="3.5" fill="#8d7447" />
                <text
                  x={point.x}
                  y={point.y - 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#133a62"
                >
                  {point.amount}
                </text>
              </motion.g>
            ))}

            <motion.g
              animate={{ x: [0, 0, 6, 0], y: [0, -6, -6, 0], opacity: [0.82, 1, 1, 0.82] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="314" y="10" width="148" height="38" rx="19" fill="#133a62" />
              <text x="388" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fffdf8">
                Croissance continue
              </text>
            </motion.g>
          </svg>

          <div className="relative z-10 mt-2 grid grid-cols-6 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            {axisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
