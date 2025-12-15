"use client"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts"

export function LearnerCharts({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Line type="monotone" dataKey="curiosity" stroke="#00e5ff" />
        <Line type="monotone" dataKey="mastery" stroke="#ffaa00" />
      </LineChart>
    </ResponsiveContainer>
  )
}