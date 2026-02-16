export const getMonthName = (date: Date): string => {
  return date.toLocaleString("en-AU", { month: "long" });
};

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

export const getMonthRanges = (date: Date): DateRange[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = date.toLocaleString("en-AU", { month: "short" });

  // Range 1: 1st to 14th
  const range1Start = new Date(year, month, 1, 0, 0, 0);
  const range1End = new Date(year, month, 14, 23, 59, 59);

  // Range 2: 15th to last day
  const range2Start = new Date(year, month, 15, 0, 0, 0);
  const range2End = new Date(year, month + 1, 0, 23, 59, 59);

  return [
    {
      start: range1Start,
      end: range1End,
      label: `${monthName} 1-14`,
    },
    {
      start: range2Start,
      end: range2End,
      label: `${monthName} 15-${range2End.getDate()}`,
    },
  ];
};

export const getCurrentRangeIndex = (date: Date): number => {
  return date.getDate() <= 14 ? 0 : 1;
};
