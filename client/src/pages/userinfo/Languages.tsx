import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
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
    return (
      <div className='mx-auto w-full max-w-300'>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur'>
          <CardHeader>
            <CardTitle className='text-white'>Loading</CardTitle>
            <CardDescription>
              Fetching language and contribution stats...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalContributions =
    data?.contributions?.contributionCalendar?.totalContributions;
  const closedIssues = data?.user?.closedIssues;
  const mergedPRs = data?.user?.mergedPRs;
  const totalStars = data?.totalStars;
  const totalForks = data?.totalForks;

  return (
    <div className='mx-auto w-full max-w-380'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur'>
          <CardHeader>
            <CardTitle className='text-white'>Contributions</CardTitle>
            <CardDescription>Recent activity and merged work</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-muted-foreground text-sm'>Commits</p>
              <p className='text-white font-mono font-medium tabular-nums'>
                {totalContributions?.toLocaleString?.() ?? "-"}
              </p>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-muted-foreground text-sm'>Issues closed</p>
              <p className='text-white font-mono font-medium tabular-nums'>
                {closedIssues?.toLocaleString?.() ?? "-"}
              </p>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-muted-foreground text-sm'>PRs merged</p>
              <p className='text-white font-mono font-medium tabular-nums'>
                {mergedPRs?.toLocaleString?.() ?? "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur'>
          <CardHeader>
            <CardTitle className='text-white'>Repo impact</CardTitle>
            <CardDescription>
              Stars and forks across repositories
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-muted-foreground text-sm'>Total stars</p>
              <p className='text-white font-mono font-medium tabular-nums'>
                {totalStars?.toLocaleString?.() ?? "-"}
              </p>
            </div>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-muted-foreground text-sm'>Total forks</p>
              <p className='text-white font-mono font-medium tabular-nums'>
                {totalForks?.toLocaleString?.() ?? "-"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-[#18181b]/60 border-white/10 backdrop-blur md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle className='text-white'>Most used languages</CardTitle>
            <CardDescription>Top 5 by repository size</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length ? (
              <ChartContainer
                className='aspect-auto h-64 w-full'
                config={chartConfig}
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout='vertical'
                  margin={{ left: 0, right: 8 }}
                >
                  <YAxis
                    dataKey='name'
                    type='category'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    width={90}
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
                    radius={6}
                    minPointSize={10}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            ) : (
              <div className='text-muted-foreground text-sm'>
                No language data available.
              </div>
            )}
          </CardContent>
          <CardFooter className='text-muted-foreground text-sm'>
            Size in KB
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Languages;
