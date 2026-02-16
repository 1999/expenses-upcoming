export const getCurrentMonthContext = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

export const getFullMonthRange = (year: number, month: number) => {
  const start = new Date(year, month - 1, 1, 0, 0, 0);
  const end = new Date(year, month, 0, 23, 59, 59);
  return { start, end };
};

export const getSiblingMonth = (
  year: number,
  month: number,
  offset: number,
) => {
  const date = new Date(year, month - 1 + offset, 1);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

export const getMonthRanges = (year: number, month: number): DateRange[] => {
  const date = new Date(year, month - 1, 1);
  const monthShort = date.toLocaleString("en-AU", { month: "short" });

  // Range 1: 1st to 14th
  const range1Start = new Date(year, month - 1, 1, 0, 0, 0);
  const range1End = new Date(year, month - 1, 14, 23, 59, 59);

  // Range 2: 15th to last day
  const range2Start = new Date(year, month - 1, 15, 0, 0, 0);
  const range2End = new Date(year, month, 0, 23, 59, 59);

  return [
    {
      start: range1Start,
      end: range1End,
      label: `${monthShort} 1-14`,
    },
    {
      start: range2Start,
      end: range2End,
      label: `${monthShort} 15-${range2End.getDate()}`,
    },
  ];
};

export const formatMonthlyTitle = (year: number, month: number) => {
  const date = new Date(year, month - 1, 1);
  const monthName = date.toLocaleString("en-AU", { month: "long" });
  return `${monthName} ${year}`;
};

export const getCurrentRangeIndex = (date: Date): number => {
  return date.getDate() <= 14 ? 0 : 1;
};
