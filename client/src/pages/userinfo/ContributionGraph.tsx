import { useMemo, useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

type Props = {
  data?: {
    contributions?: {
      contributionCalendar?: ContributionCalendar;
    };
  };
  isLoading?: boolean;
  className?: string;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const ContributionGraph = ({ data, className = "" }: Props) => {
  const calendar = data?.contributions?.contributionCalendar;

  const { weeks, total, max } = useMemo(() => {
    const w = calendar?.weeks ?? [];
    let maxCount = 0;

    for (const week of w) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > maxCount) maxCount = day.contributionCount;
      }
    }

    return {
      weeks: w,
      total: calendar?.totalContributions ?? 0,
      max: maxCount,
    };
  }, [calendar]);

  const [hover, setHover] = useState<ContributionDay | null>(null);

  if (!calendar) {
    return (
      <section
        className={`mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-7 ${className}`}
      >
        <div className='text-sm text-zinc-400'>No contribution data.</div>
      </section>
    );
  }

  return (
    <section
      className={`mx-auto w-full max-w-380 rounded-lg border my-9 border-white/10 bg-[#18181b] p-5 backdrop-blur sm:p-7 ${className}`}
    >
      <header className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <div className='min-w-0'>
          <h2 className='truncate text-xl font-semibold tracking-tight text-zinc-100'>
            Contributions
          </h2>
          <p className='mt-1 text-sm text-zinc-400'>
            Total: <span className='text-zinc-200'>{total}</span>
            {max > 0 ? (
              <>
                {" "}
                · Max/day: <span className='text-zinc-200'>{max}</span>
              </>
            ) : null}
          </p>
        </div>

        <div className='text-sm text-zinc-400'>
          {hover ? (
            <span className='text-zinc-200'>
              {hover.contributionCount} contribution
              {hover.contributionCount === 1 ? "" : "s"} on{" "}
              {formatDate(hover.date)}
            </span>
          ) : (
            <span>Hover a day</span>
          )}
        </div>
      </header>

      <div className='mt-5 overflow-x-auto'>
        <div className='w-fit mx-auto'>
          <div className='inline-flex min-w-max gap-2.5'>
            {weeks.map((week, wi) => (
              <div key={wi} className='flex flex-col gap-1.5'>
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    role='img'
                    aria-label={`${day.contributionCount} contributions on ${day.date}`}
                    className='h-3.5 w-3.5 rounded-[6px] border border-white/10'
                    style={{ backgroundColor: day.color }}
                    onMouseEnter={() => setHover(day)}
                    onMouseLeave={() =>
                      setHover((prev) =>
                        prev?.date === day.date ? null : prev,
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className='mt-5 flex items-center justify-between text-xs text-zinc-400'>
        <span>Less</span>
        <div className='flex items-center gap-1.5'>
          {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((c) => (
            <div
              key={c}
              className='h-3.5 w-3.5 rounded-[6px] border border-white/10'
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <span>More</span>
      </footer>
    </section>
  );
};

export default ContributionGraph;
