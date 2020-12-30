const padding = (num: number): string => ("00" + num).slice(-2);

export const createdAtFormat = (d: Date) => {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${padding(
    d.getHours()
  )}:${padding(d.getMinutes())}`;
};
