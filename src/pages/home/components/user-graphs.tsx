import { ChartTooltip } from "@/components/charts/tooltip";
import XAxis from "@/components/charts/x-axis";
import { GithubCalendar } from "@/components/ui/github-calendar";
import Area from "@/components/charts/area";
import { useMemo, useState } from "react";
import AreaChart from "@/components/charts/area-chart";
import Grid from "@/components/charts/grid";
import BasicDropdown from "@/components/smoothui/basic-dropdown";
import { AnimatePresence } from "motion/react";

const UserGraphs = ({
  graph: data,
  username,
}: {
  graph: any;
  username: string;
}) => {
  const [view, setView] = useState<"calendar" | "graph">("calendar");

  const items = [
    { id: 1, label: "Calendar" },
    { id: 2, label: "Graph" },
  ];

  const chartData = useMemo(() => {
    if (!data) return [];

    return data.contributions.flat().map((day: any) => ({
      date: day.date,
      contributions: day.contributionCount,
    }));
  }, [data]);

  const areaData = useMemo(() => {
    if (!chartData.length) return [];

    if (view === "graph") {
      return chartData.map((d: any): any => ({
        ...d,
        contributions: d.contributions,
      }));
    }

    return [];
  }, [view, chartData]);

  return (
    <div className='flex flex-col flex-1 min-w-0 w-full min-h-0'>
      <div
        className='
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-3
      mb-3
      px-4 sm:px-6
  '
      >
        <div>
          <h3 className='font-bold text-lg sm:text-xl tracking-tight'>
            Activity
          </h3>
          <p className='text-sm text-muted-foreground'>
            Detailed contribution overview
          </p>
        </div>

        <BasicDropdown
          items={items}
          label='View Activity'
          onChange={(item) => setView(item.label.toLowerCase() as any)}
          className='w-full sm:w-44'
        />
      </div>

      <div
        className='
      flex-1
      w-full
      min-w-0
      p-4 sm:p-6
      flex
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
      border
      shadow-lg
    '
      >
        <AnimatePresence mode='wait'>
          {view === "calendar" ? (
            <div className='w-full overflow-x-auto flex justify-center'>
              <GithubCalendar
                username={username}
                className='w-full max-w-full'
              />
            </div>
          ) : (
            <div className='w-full'>
              <AreaChart data={areaData} aspectRatio='4 / 1'>
                <Grid vertical />

                <Area
                  dataKey='contributions'
                  fill='var(--chart-line-primary)'
                  fillOpacity={0.3}
                  gradientToOpacity={0.3}
                />

                <XAxis />
                <ChartTooltip />
              </AreaChart>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserGraphs;
