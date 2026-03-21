"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  totalEarningChartData,
  TotalEarningChartItem,
} from "./total-earning-chart-data";

type TotalEarningChartProps = {
  data?: TotalEarningChartItem[];
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: TotalEarningChartItem;
  }>;
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 shadow-md">
      <p className="text-[12px] font-medium text-[#6B7280]">{label} 2021</p>
      <p className="text-sm font-semibold text-[#1D4ED8]">${payload[0].value}</p>
    </div>
  );
}

export function TotalEarningChart({
  data = totalEarningChartData,
}: TotalEarningChartProps) {
  return (
    <div className="px-6 pb-6">
        <Card className="rounded-2xl border border-[#E5E7EB] shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-[#111827]">
          Total Earning
        </CardTitle>
        <p className="text-sm text-[#4B5563]">
          Track total revenue, platform commission, and payouts over time.
        </p>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.20} />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#F1F5F9" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[0, 200]}
                ticks={[50, 100, 150, 200]}
              />

              <Tooltip
                cursor={{
                  stroke: "#94A3B8",
                  strokeDasharray: "4 4",
                }}
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="earning"
                stroke="#1E3A8A"
                strokeWidth={3}
                fill="url(#earningFill)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#1E3A8A",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}





// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getTotalEarningChart } from "@/services/dashboard/get-total-earning-chart";
// import {
//   TotalEarningChartApiResponse,
//   TotalEarningChartItem,
// } from "@/types/total-earning-chart";

// type CustomTooltipProps = {
//   active?: boolean;
//   payload?: Array<{
//     value: number;
//     payload: TotalEarningChartItem;
//   }>;
//   label?: string;
// };

// function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 shadow-md">
//       <p className="text-[12px] font-medium text-[#6B7280]">{label} 2021</p>
//       <p className="text-sm font-semibold text-[#1D4ED8]">${payload[0].value}</p>
//     </div>
//   );
// }

// function TotalEarningChartSkeleton() {
//   return (
//     <Card className="rounded-2xl border border-[#E5E7EB] shadow-none">
//       <CardHeader className="pb-2">
//         <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
//         <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
//       </CardHeader>
//       <CardContent className="pt-2">
//         <div className="h-[320px] w-full animate-pulse rounded-xl bg-gray-100" />
//       </CardContent>
//     </Card>
//   );
// }

// function TotalEarningChartError({ message }: { message: string }) {
//   return (
//     <Card className="rounded-2xl border border-[#E5E7EB] shadow-none">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base font-semibold text-[#111827]">
//           Total Earning
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50">
//           <p className="text-sm font-medium text-red-500">{message}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function TotalEarningChartEmpty() {
//   return (
//     <Card className="rounded-2xl border border-[#E5E7EB] shadow-none">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base font-semibold text-[#111827]">
//           Total Earning
//         </CardTitle>
//         <p className="text-sm text-[#4B5563]">
//           Track total revenue, platform commission, and payouts over time.
//         </p>
//       </CardHeader>
//       <CardContent>
//         <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-[#E5E7EB]">
//           <p className="text-sm text-[#6B7280]">No earning data found.</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default function TotalEarningChart() {
//   const { data: session } = useSession();
//   const accessToken = (session?.user as { accessToken?: string })?.accessToken;

//   const { data, isLoading, isError, error } =
//     useQuery<TotalEarningChartApiResponse>({
//       queryKey: ["total-earning-chart"],
//       queryFn: () => getTotalEarningChart(accessToken),
//       enabled: !!accessToken,
//     });

//   if (isLoading) {
//     return <TotalEarningChartSkeleton />;
//   }

//   if (isError) {
//     return (
//       <TotalEarningChartError
//         message={(error as Error)?.message || "Something went wrong"}
//       />
//     );
//   }

//   if (!data?.data?.length) {
//     return <TotalEarningChartEmpty />;
//   }

//   return (
//     <Card className="rounded-2xl border border-[#E5E7EB] shadow-none">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base font-semibold text-[#111827]">
//           Total Earning
//         </CardTitle>
//         <p className="text-sm text-[#4B5563]">
//           Track total revenue, platform commission, and payouts over time.
//         </p>
//       </CardHeader>

//       <CardContent className="pt-2">
//         <div className="h-[320px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={data.data}
//               margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.20} />
//                   <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.03} />
//                 </linearGradient>
//               </defs>

//               <CartesianGrid vertical={false} stroke="#F1F5F9" />

//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{ fill: "#9CA3AF", fontSize: 12 }}
//               />

//               <YAxis
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{ fill: "#9CA3AF", fontSize: 12 }}
//                 ticks={[50, 100, 150, 200]}
//               />

//               <Tooltip
//                 cursor={{
//                   stroke: "#94A3B8",
//                   strokeDasharray: "4 4",
//                 }}
//                 content={<CustomTooltip />}
//               />

//               <Area
//                 type="monotone"
//                 dataKey="earning"
//                 stroke="#1E3A8A"
//                 strokeWidth={3}
//                 fill="url(#earningFill)"
//                 dot={false}
//                 activeDot={{
//                   r: 5,
//                   fill: "#1E3A8A",
//                   stroke: "#ffffff",
//                   strokeWidth: 2,
//                 }}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }