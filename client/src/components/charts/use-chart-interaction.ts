export type ChartSelection = {
  /** X position in pixels (relative to chart inner area) */
  startPx: number;
  /** X position in pixels (relative to chart inner area) */
  endPx: number;
  /** Domain value at start (usually a Date for time series) */
  startValue: Date;
  /** Domain value at end (usually a Date for time series) */
  endValue: Date;
};
