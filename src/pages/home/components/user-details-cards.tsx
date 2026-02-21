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

const UserDetails = ({ user, repos }: Props) => {
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
    <div className='flex gap-5 shrink-0'>
      <div className='flex flex-col items-center text-center p-8 w-90 rounded-3xl border shadow-lg'>
        <div className='p-1 rounded-full'>
          <img
            src='https://i.pinimg.com/736x/35/52/a8/3552a84505b17d071fac7097da40b7b9.jpg'
            alt='sourav'
            className='h-24 w-24 rounded-full object-cover'
          />
        </div>

        <div className='mt-5'>
          <h2 className='text-xl font-semibold'>Sourav</h2>
          <p className='text-sm'>@sourav</p>
        </div>

        <div className='flex gap-12 mt-6'>
          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold'>12.5k</h3>
            <p className='text-sm'>Followers</p>
          </div>

          <div className='flex flex-col items-center'>
            <h3 className='text-lg font-semibold'>150</h3>
            <p className='text-sm'>Repositories</p>
          </div>
        </div>

        <button className='mt-8 w-full py-3 rounded-full transition'>
          View profile
        </button>
      </div>

      <div className='flex flex-col gap-5 w-85'>
        {/* Card 1 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Total Stars</p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>3,045</h2>
          <p className='text-sm opacity-70 mt-4'>Total Stars</p>
        </div>

        {/* Card 2 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Top Repo</p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>Games</h2>
          <p className='text-sm opacity-70 mt-2'>Top Repo</p>
        </div>

        {/* Card 3 */}
        <div className='rounded-2xl border shadow-sm p-5'>
          <p className='text-sm opacity-70'>Total </p>
          <h2 className='text-3xl font-semibold leading-none mt-2'>102</h2>
          <p className='text-sm opacity-70 mt-2'>Pull Requests</p>
        </div>
      </div>

      <div className='flex flex-col p-6 h-110 w-95 rounded-2xl shadow-sm border justify-center items-center'>
        <PieChart
          data={pieData}
          size={280}
          innerRadius={75}
          hoveredIndex={hoveredIndex}
          onHoverChange={setHoveredIndex}
        >
          {pieData.map((_, index) => (
            <PieSlice key={index} index={index} />
          ))}

          <PieCenter defaultLabel='Languages' />
        </PieChart>

        <Legend items={mostUsedData} title='Most used'>
          <LegendItem className='grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1'>
            <LegendMarker />
            <LegendLabel />
            <LegendValue showPercentage />
            <div className='col-span-full w-70'>
              <LegendProgress />
            </div>
          </LegendItem>
        </Legend>
      </div>
    </div>
  );
};

export default UserDetails;
