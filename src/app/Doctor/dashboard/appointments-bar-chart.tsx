"use client";

import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface AppointmentsBarChartProps {
  data: ChartData[];
}

export function AppointmentsBarChart({ data }: AppointmentsBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar
          dataKey="value"
          style={{
            fill: "#4f46e5",
            opacity: 0.8,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}