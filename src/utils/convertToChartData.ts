import { ChartData } from "src/types/chartTypes";

export const convertToChartData = <T extends {borrowCount: number; bookName?: string; userName?: string; librarianName?: string}>(
  data: T[],
  labelKey: keyof T
): ChartData => {
  return {
    labels: data.map((item) => item[labelKey] as string),
    values: data.map((item) => item.borrowCount)
  };
};