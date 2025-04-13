"use client"

import { Bar, BarChart, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    total: 40,
  },
  {
    name: "Feb",
    total: 30,
  },
  {
    name: "Mar",
    total: 20,
  },
  {
    name: "Apr",
    total: 27,
  },
  {
    name: "May",
    total: 18,
  },
  {
    name: "Jun",
    total: 23,
  },
  {
    name: "Jul",
    total: 34,
  },
  {
    name: "Aug",
    total: 30,
  },
  {
    name: "Sep",
    total: 25,
  },
  {
    name: "Oct",
    total: 30,
  },
  {
    name: "Nov",
    total: 40,
  },
  {
    name: "Dec",
    total: 35,
  },
]

export function AppointmentsBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar
          dataKey="total"
          style={{
            fill: "#4f46e5",
            opacity: 0.8,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

