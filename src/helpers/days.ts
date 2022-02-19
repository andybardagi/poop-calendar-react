import Calendar from '../components/Calendar/Calendar';
export const daysPerMonth = (): number[] => {
  const months = Array(12).fill(0);
  const auxArr = Array(12).fill(0);
  auxArr.forEach((m, i) => {
    const dt = new Date();
    dt.setMonth(i + 1);
    dt.setDate(0);

    months[i] = dt.getDate();
  });

  return months;
};

type Calendar = Array<{
  monthString: string;
  days: Array<number>;
}>;

export const nullCalendar = (): Calendar => {
  const months: Calendar = [
    { monthString: 'January', days: [] },
    { monthString: 'February', days: [] },
    { monthString: 'March', days: [] },
    { monthString: 'April', days: [] },
    { monthString: 'May', days: [] },
    { monthString: 'June', days: [] },
    { monthString: 'July', days: [] },
    { monthString: 'August', days: [] },
    { monthString: 'September', days: [] },
    { monthString: 'October', days: [] },
    { monthString: 'November', days: [] },
    { monthString: 'December', days: [] },
  ];

  const daysMonth = daysPerMonth();
  daysMonth.forEach((daysQuant, month) => {
    months[month].days = Array(daysQuant).fill(0);
  });

  return months;
};
