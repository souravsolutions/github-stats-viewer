import { ChartTooltip } from "@/components/charts/tooltip";
import XAxis from "@/components/charts/x-axis";
import { GithubCalendar } from "@/components/ui/github-calendar";
import Area from "@/components/charts/area";
import { useGithubGraph } from "../hooks/get-github-user";
import { useMemo, useState } from "react";
import AreaChart from "@/components/charts/area-chart";
import Grid from "@/components/charts/grid";
import BasicDropdown from "@/components/smoothui/basic-dropdown";
import { motion, AnimatePresence } from "motion/react";

const UserGraphs = () => {
  const username = "Ayush01010101";
  const { data } = useGithubGraph(username);
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
    <div className='flex-1 flex flex-col w-full mt-8 min-h-0'>
      <div className='flex items-center justify-between mb-6 px-4'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-bold text-2xl tracking-tight'>Activity</h3>
          <p className='text-sm text-muted-foreground'>
            Detailed contribution overview
          </p>
        </div>
        <BasicDropdown
          items={items}
          label='View Activity'
          onChange={(item) => setView(item.label.toLowerCase() as any)}
          className='w-44'
        />
      </div>

      <div className='flex-1  rounded-[2.5rem] border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 flex flex-col items-center justify-center overflow-hidden relative group transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]'>
        <AnimatePresence mode='wait'>
          {view === "calendar" ? (
            <motion.div
              key='calendar'
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className='w-full'
            >
              <GithubCalendar username={username} />
            </motion.div>
          ) : (
            <motion.div
              key='graph'
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className='w-full h-full min-h-80'
            >
              <AreaChart data={areaData} aspectRatio='3.5 / 1'>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserGraphs;
