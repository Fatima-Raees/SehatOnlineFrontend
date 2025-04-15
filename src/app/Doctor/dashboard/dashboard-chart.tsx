"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    total: 24,
  },
  {
    name: "Feb",
    total: 36,
  },
  {
    name: "Mar",
    total: 30,
  },
  {
    name: "Apr",
    total: 24,
  },
  {
    name: "May",
    total: 18,
  },
  {
    name: "Jun",
    total: 30,
  },
  {
    name: "Jul",
    total: 42,
  },
  {
    name: "Aug",
    total: 36,
  },
  {
    name: "Sep",
    total: 42,
  },
  {
    name: "Oct",
    total: 36,
  },
  {
    name: "Nov",
    total: 30,
  },
  {
    name: "Dec",
    total: 36,
  },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="total"
          activeDot={{
            r: 6,
            style: { fill: "var(--theme-primary)", opacity: 0.25 },
          }}
          style={{
            stroke: "#22c55e",
            "--theme-primary": "#22c55e",
          } as React.CSSProperties}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

