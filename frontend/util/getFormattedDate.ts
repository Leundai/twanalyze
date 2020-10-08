const months: {
  [key: number]: string;
} = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const getFormattedDate = (date: Date) => {
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${date.getFullYear()}`;
};
