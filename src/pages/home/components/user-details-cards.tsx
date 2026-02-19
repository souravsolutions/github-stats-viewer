import type { GithubRepo, GithubUser } from "@/api/github/github-types";
import { useMemo } from "react";

import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import {
  Legend,
  LegendItem,
  LegendLabel,
  LegendMarker,
  LegendValue,
} from "@/components/charts/legend";

type Props = {
  user: GithubUser | undefined;
  repos: GithubRepo[] | undefined;
};

const UserDetails = ({ user, repos }: Props) => {
  const languageStats = useMemo(() => {
    if (!repos) return [];

    const counts: Record<string, number> = {};

    repos.forEach((repo) => {
      if (!repo.language) return;

      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    let languages = Object.entries(counts).map(([lang, count]) => ({
      label: lang,
      value: (count / total) * 100,
    }));

    languages.sort((a, b) => b.value - a.value);

    if (languages.length > 2) {
      const topTwo = languages.slice(0, 2);

      const otherValue = languages
        .slice(2)
        .reduce((sum, l) => sum + l.value, 0);

      topTwo.push({
        label: "Other",
        value: otherValue,
      });

      languages = topTwo;
    }

    return languages.map((l) => ({
      label: l.label,
      value: Number(l.value.toFixed(2)),
    }));
  }, [repos]);

  const chartData = useMemo(() => {
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
    ];

    return languageStats.map((lang, i) => ({
      label: lang.label,
      value: lang.value,
      maxValue: 100,
      color: colors[i],
    }));
  }, [languageStats]);

  return (
    <div className='flex gap-5'>
      <div className='flex flex-col items-center text-center p-8 w-90 h-115 rounded-3xl border shadow-lg'>
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
          <p className='text-sm opacity-70 mt-2'>Total Stars</p>
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
        <RingChart data={chartData} size={270} strokeWidth={15} ringGap={8}>
          {chartData.map((_, index) => (
            <Ring key={index} index={index} />
          ))}

          <RingCenter
            formatOptions={{
              notation: "standard",
              maximumFractionDigits: 0,
            }}
            defaultLabel='Languages'
          />
        </RingChart>
        <Legend items={chartData}>
          <LegendItem className='flex items-center gap-3'>
            <LegendMarker />
            <LegendLabel className='flex-1' />
            <LegendValue />
          </LegendItem>
        </Legend>
      </div>
    </div>
  );
};

export default UserDetails;
