import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#216e39",
  },
};

const WeeklyGraph = ({ data }: any) => {
  const calendar = data?.contributions?.contributionCalendar;

  const months = useMemo(() => {
    const w = calendar?.weeks ?? [];
    const totals = new Map<string, number>();

    for (const week of w) {
      for (const day of week.contributionDays) {
        const mothKey = day.date.slice(0, 7);
        totals.set(mothKey, (totals.get(mothKey) ?? 0) + day.contributionCount);
      }
    }

    const Months = Array.from(totals.entries())
      .slice(-12)
      .map(([month, total]) => ({
        month: new Date(`${month}-01`).toLocaleString("en-US", {
          month: "short",
        }),
        total,
      }));

    return Months;
  }, [calendar]);

  const last7Days = useMemo(() => {
    const weeks = calendar?.weeks ?? [];

    const allDays: { date: string; total: number }[] = [];

    for (const week of weeks) {
      for (const day of week.contributionDays) {
        allDays.push({ date: day.date, total: day.contributionCount });
      }
    }

    const last7 = allDays
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7)
      .map((d) => ({
        date: d.date,
        total: d.total,
        label: new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
      }));
    return last7;
  }, [calendar]);

  return (
    <div className='mx-auto w-full max-w-380'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle className="text-white">Monthly Contribution Chart</CardTitle>
            <CardDescription>One Year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={months}>
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey='total' fill='#216e39' radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle className="text-white">Days of Contribution</CardTitle>
            <CardDescription>Last seven days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={last7Days}>
                <XAxis
                  dataKey='label'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey='total' fill='#216e39' radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyGraph;
