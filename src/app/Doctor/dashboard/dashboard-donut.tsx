"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Women", value: 44 },
  { name: "Men", value: 55 },
]

const COLORS = ["#4f46e5", "#c7d2fe"]

export function DashboardDonut() {
  return (
    <div className="h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={0} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

