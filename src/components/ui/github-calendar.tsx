import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useGithubGraph } from "@/pages/home/hooks/get-github-user";

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type Day = {
  date: string; // expected ISO-ish date string
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

type Week = Day[];

interface GithubCalendarProps {
  username: string;
  variant?: "default" | "city-lights" | "minimal";
  shape?: "square" | "rounded" | "circle" | "squircle";
  glowIntensity?: number;
  className?: string;
  showTotal?: boolean;
  colorSchema?: "green" | "blue" | "purple" | "orange" | "gray";
}

const colorSchemas = {
  gray: {
    level0: "bg-zinc-100 dark:bg-zinc-900",
    level1: "bg-zinc-300 dark:bg-zinc-800",
    level2: "bg-zinc-400 dark:bg-zinc-700",
    level3: "bg-zinc-600 dark:bg-zinc-500",
    level4: "bg-zinc-800 dark:bg-zinc-300",
  },
  green: {
    level0: "bg-zinc-100 dark:bg-zinc-900",
    level1: "bg-emerald-200 dark:bg-emerald-900",
    level2: "bg-emerald-300 dark:bg-emerald-700",
    level3: "bg-emerald-400 dark:bg-emerald-500",
    level4: "bg-emerald-500 dark:bg-emerald-400",
  },
  blue: {
    level0: "bg-zinc-100 dark:bg-zinc-900",
    level1: "bg-blue-200 dark:bg-blue-900",
    level2: "bg-blue-300 dark:bg-blue-700",
    level3: "bg-blue-400 dark:bg-blue-500",
    level4: "bg-blue-500 dark:bg-blue-400",
  },
  purple: {
    level0: "bg-zinc-100 dark:bg-zinc-900",
    level1: "bg-purple-200 dark:bg-purple-900",
    level2: "bg-purple-300 dark:bg-purple-700",
    level3: "bg-purple-400 dark:bg-purple-500",
    level4: "bg-purple-500 dark:bg-purple-400",
  },
  orange: {
    level0: "bg-zinc-100 dark:bg-zinc-900",
    level1: "bg-orange-200 dark:bg-orange-900",
    level2: "bg-orange-300 dark:bg-orange-700",
    level3: "bg-orange-400 dark:bg-orange-500",
    level4: "bg-orange-500 dark:bg-orange-400",
  },
} as const;

function getLevelClass(
  level: ContributionLevel,
  schema: keyof typeof colorSchemas = "green",
) {
  const s = colorSchemas[schema];
  switch (level) {
    case "FIRST_QUARTILE":
      return s.level1;
    case "SECOND_QUARTILE":
      return s.level2;
    case "THIRD_QUARTILE":
      return s.level3;
    case "FOURTH_QUARTILE":
      return s.level4;
    case "NONE":
    default:
      return s.level0;
  }
}

function getShapeClass(shape: GithubCalendarProps["shape"]) {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "square":
      return "rounded-none";
    case "squircle":
      return "rounded-sm";
    case "rounded":
    default:
      return "rounded-[2px]";
  }
}

function isValidDateString(dateStr: unknown): dateStr is string {
  if (typeof dateStr !== "string") return false;
  if (!dateStr.trim()) return false;
  const t = new Date(dateStr).getTime();
  return Number.isFinite(t);
}

function formatTooltipDate(dateStr: string) {
  // If the incoming is ISO (YYYY-MM-DD), Date parsing is OK in modern engines.
  // We still guard above; this formatter keeps tooltip friendly.
  return new Date(dateStr).toDateString();
}

function normalizeWeeks(input: unknown): Week[] {
  // Input is expected Week[] (Day[][]). We sanitize:
  // - ensure it's an array of arrays
  // - coerce day objects
  // - keep invalid dates but mark them (so layout stays) OR you can drop them.
  if (!Array.isArray(input)) return [];

  const weeks: Week[] = [];

  for (const week of input) {
    if (!Array.isArray(week)) continue;

    const days: Day[] = [];

    for (const d of week) {
      if (!d || typeof d !== "object") continue;

      const day = d as any;

      const date = typeof day.date === "string" ? day.date : "";
      const contributionCount =
        typeof day.contributionCount === "number" ? day.contributionCount : 0;

      const contributionLevel: ContributionLevel =
        day.contributionLevel === "FIRST_QUARTILE" ||
        day.contributionLevel === "SECOND_QUARTILE" ||
        day.contributionLevel === "THIRD_QUARTILE" ||
        day.contributionLevel === "FOURTH_QUARTILE" ||
        day.contributionLevel === "NONE"
          ? day.contributionLevel
          : contributionCount > 0
            ? "FIRST_QUARTILE"
            : "NONE";

      days.push({
        date,
        contributionCount,
        contributionLevel,
      });
    }

    // keep even if empty? usually no; but safe:
    if (days.length) weeks.push(days);
  }

  return weeks;
}

function getGlowColor(schema: GithubCalendarProps["colorSchema"]) {
  switch (schema) {
    case "green":
      return "#10b981";
    case "blue":
      return "#3b82f6";
    case "purple":
      return "#a855f7";
    case "orange":
      return "#f97316";
    case "gray":
    default:
      return "#a1a1aa";
  }
}

export function GithubCalendar({
  username,
  variant = "default",
  shape = "rounded",
  glowIntensity = 5,
  className,
  showTotal = true,
  colorSchema = "green",
}: GithubCalendarProps) {
  const { data, isLoading, error } = useGithubGraph(username);

  const [hoveredDate, setHoveredDate] = React.useState<string | null>(null);
  const [hoveredCount, setHoveredCount] = React.useState<number | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  if (error) {
    return (
      <div
        className={cn(
          "p-4 rounded-lg border border-red-200 bg-red-50 text-red-500 text-sm",
          className,
        )}
      >
        error
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full h-32 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl",
          className,
        )}
      />
    );
  }

  const weeks: Week[] = normalizeWeeks((data as any)?.contributions);

  const shapeClass = getShapeClass(shape);
  const glowColor = getGlowColor(colorSchema);

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      {showTotal && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              height="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              data-view-component="true"
              className="fill-current text-muted-foreground"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <span className="font-semibold text-sm">@{username}</span>
          </div>

          <span className="text-sm text-muted-foreground">
            {(data as any)?.totalContributions ?? 0} contributions in the last
            year
          </span>
        </div>
      )}

      <div
        className="relative flex justify-between gap-1 w-full"
        onMouseLeave={() => {
          setHoveredDate(null);
          setHoveredCount(null);
        }}
      >
        <AnimatePresence>
          {hoveredDate && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 pointer-events-none px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs rounded-md shadow-xl whitespace-nowrap"
              style={{
                left: mousePos.x,
                top: mousePos.y - 40,
                transform: "translateX(-50%)",
              }}
            >
              <span className="font-bold mr-1">{hoveredCount}</span>
              <span className="text-zinc-400 dark:text-zinc-500">
                contributions on {hoveredDate}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {weeks.map((week, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            className="flex flex-col gap-1 flex-1"
          >
            {week.map((day, dayIndex) => {
              const isGlowing =
                variant === "city-lights" && day.contributionCount > 0;
              const isMinimal = variant === "minimal";

              const valid = isValidDateString(day.date);

              // ✅ Key is ALWAYS unique, even if date is missing/invalid:
              const key = valid
                ? `day-${day.date}-${weekIndex}-${dayIndex}`
                : `day-invalid-${weekIndex}-${dayIndex}`;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: weekIndex * 0.01 + dayIndex * 0.01,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  onMouseEnter={(e) => {
                    setHoveredCount(day.contributionCount);

                    // ✅ Tooltip date will never be "Invalid Date"
                    setHoveredDate(
                      valid ? formatTooltipDate(day.date) : "Unknown date",
                    );

                    const rect = e.currentTarget.getBoundingClientRect();
                    const parentRect = (
                      e.currentTarget.offsetParent as HTMLElement | null
                    )?.getBoundingClientRect();

                    if (parentRect) {
                      setMousePos({
                        x: rect.left - parentRect.left + rect.width / 2,
                        y: rect.top - parentRect.top,
                      });
                    }
                  }}
                  className={cn(
                    "w-full aspect-square transition-colors duration-200",
                    getLevelClass(day.contributionLevel, colorSchema),
                    isGlowing && "z-10",
                    shapeClass,
                    isMinimal && "rounded-full scale-75",
                    !valid && "opacity-70", // subtle hint for bad data
                  )}
                  style={
                    isGlowing
                      ? {
                          boxShadow:
                            day.contributionLevel !== "NONE"
                              ? `0 0 ${
                                  day.contributionCount > 3
                                    ? `${glowIntensity * 1.5}px`
                                    : `${glowIntensity}px`
                                } ${glowColor}`
                              : "none",
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}