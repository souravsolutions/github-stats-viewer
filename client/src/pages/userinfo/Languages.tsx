import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

const Languages = ({ data, isLoading }: any) => {
  const chartData = useMemo(() => {
    if (!data?.languages) return [];

    return Object.entries(data.languages)
      .map(([name, value]: any) => ({
        name,
        size: value.size,
        fill: value.color,
      }))
      .sort((a, b) => b.size - a.size) // SORT BY SIZE
      .slice(0, 5); //ONLY SHOW TOP 5
  }, [data?.languages]);

  const chartConfig = useMemo((): ChartConfig => {
    return chartData.reduce((acc, item) => {
      acc[item.name] = { label: item.name, color: item.fill };
      return acc;
    }, {} as ChartConfig);
  }, [chartData]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className='mx-auto w-full max-w-380 flex gap-4 h-90'>
      <div className='flex-1 rounded-lg border border-white/10 p-4 sm:p-6 backdrop-blur '>
        <h1>Contributions</h1>
        <div>
          <div className='flex gap-5'>
            <h1>commits</h1>
            <p>
              {data?.contributions?.contributionCalendar.totalContributions}
            </p>
          </div>
          <div className='flex gap-5'>
            <h1>Issue closed</h1>
            <p>{data?.user?.closedIssues}</p>
          </div>
          <div className='flex gap-5'>
            <h1>pr merged</h1>
            <p>{data?.user?.mergedPRs}</p>
          </div>
        </div>
      </div>
      <div className='flex-1 rounded-lg border border-white/10 p-4 sm:p-6 backdrop-blur'>
        <h1>Total stars</h1>
        <div className='flex gap-5'>
          <h1>total stars</h1>
          <p>{data?.totalStars}</p>
        </div>
        <div className='flex gap-5'>
          <h1>total forks</h1>
          <p>{data?.totalForks}</p>
        </div>
      </div>
      <Card className='flex-1 bg-[#18181b] border border-white/10'>
        <CardHeader>
          <CardTitle className='text-white'>Most used Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout='vertical'
              margin={{ left: 0 }}
            >
              <YAxis
                dataKey='name'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis
                dataKey='size'
                type='number'
                hide
                scale='log'
                domain={["dataMin", "dataMax"]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey='size'
                layout='vertical'
                radius={5}
                minPointSize={10}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='flex gap-2 leading-none font-medium text-gray-500'>
            Size in kb
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Languages;
