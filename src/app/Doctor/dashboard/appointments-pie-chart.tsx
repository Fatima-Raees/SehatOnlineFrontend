"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Male", value: 25 },
  { name: "Female", value: 25 },
  { name: "Child", value: 25 },
  { name: "Germany", value: 25 },
]

const COLORS = ["#4f46e5", "#93c5fd", "#22c55e", "#ef4444"]

export function AppointmentsPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

