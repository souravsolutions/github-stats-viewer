import type { GithubRepo, GithubUser } from "@/api/github/github-types";
import { useMemo, useState } from "react";

import PieSlice from "@/components/charts/pie-slice";
import PieCenter from "@/components/charts/pie-center";
import PieChart from "@/components/charts/pie-chart";
import { languageColors } from "./colors";
import {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendProgress,
  LegendValue,
} from "@/components/charts/legend";

type Props = {
  user: GithubUser | undefined;
  repos: GithubRepo[] | undefined;
};

const UserDetails = ({ repos }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const languageStats = useMemo(() => {
    if (!repos?.length) return [];

    const counts: Record<string, number> = {};

    repos.forEach((repo) => {
      if (!repo.language) return;

      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    const languages = Object.entries(counts)
      .map(([lang, count]) => ({
        label: lang,
        value: (count / total) * 100,
      }))
      .sort((a, b) => b.value - a.value);

    return languages.map((l) => ({
      label: l.label,
      value: Number(l.value.toFixed(2)),
    }));
  }, [repos]);

  const pieData = useMemo(() => {
    return languageStats.map((lang) => ({
      label: lang.label,
      value: lang.value,
      color: languageColors[lang.label] ?? "#6b7280", // fallback color
    }));
  }, [languageStats]);

  const mostUsedLanguage = useMemo(() => {
    if (!pieData.length) return null;

    return pieData[0]; // already sorted descending
  }, [pieData]);

  const mostUsedData = mostUsedLanguage
    ? [
        {
          label: mostUsedLanguage.label,
          value: mostUsedLanguage.value,
          maxValue: 100,
          color: mostUsedLanguage.color,
        },
      ]
    : [];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full'>
      <div className='flex flex-col items-center text-center p-5 md:p-6 rounded-3xl border shadow-lg w-full'>
        <img
          src='https://i.pinimg.com/736x/35/52/a8/3552a84505b17d071fac7097da40b7b9.jpg'
          alt='sourav'
          className='h-20 w-20 md:h-24 md:w-24 rounded-full object-cover'
        />

        <div className='mt-4'>
          <h2 className='text-lg md:text-xl font-semibold'>Sourav</h2>
          <p className='text-sm opacity-70'>@sourav</p>
        </div>

        <div className='grid grid-cols-2 gap-8 mt-6 w-full max-w-xs'>
          <div>
            <h3 className='font-semibold text-lg'>12.5k</h3>
            <p className='text-sm opacity-70'>Followers</p>
          </div>

          <div>
            <h3 className='font-semibold text-lg'>150</h3>
            <p className='text-sm opacity-70'>Repositories</p>
          </div>
        </div>

        <button className='mt-6 w-full py-2 rounded-full border hover:bg-muted transition'>
          View profile
        </button>
      </div>

      <div className='grid gap-5 w-full'>
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Total Stars</p>
          <h2 className='text-2xl md:text-3xl font-semibold mt-2'>3,045</h2>
        </div>

        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Top Repo</p>
          <h2 className='text-2xl md:text-3xl font-semibold mt-2'>Games</h2>
        </div>

        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Pull Requests</p>
          <h2 className='text-2xl md:text-3xl font-semibold mt-2'>102</h2>
        </div>
      </div>

      <div
        className='
    flex flex-col items-center justify-center
    p-5 md:p-6 rounded-2xl border shadow-sm w-full
    md:col-span-2 xl:col-span-1
  '
      >
        {/* Responsive Chart */}
        <div className='w-full max-w-[320px] aspect-square flex justify-center items-center'>
          <PieChart
            data={pieData}
            size={260}
            innerRadius={70}
            hoveredIndex={hoveredIndex}
            onHoverChange={setHoveredIndex}
          >
            {pieData.map((_, index) => (
              <PieSlice key={index} index={index} />
            ))}
            <PieCenter defaultLabel='Languages' />
          </PieChart>
        </div>

        <div className='w-full mt-4'>
          <Legend items={mostUsedData} title='Most used'>
            <LegendItem className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1 w-full'>
              <LegendMarker />
              <LegendLabel />
              <LegendValue showPercentage />
              <div className='col-span-full w-full'>
                <LegendProgress />
              </div>
            </LegendItem>
          </Legend>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
