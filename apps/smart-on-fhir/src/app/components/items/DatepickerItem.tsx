import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';

interface IProps {
  index: number;
  text: string;
  dateList: string[];
  setDateList: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * DatepickerItem displays a calender for input
 * Currently used together with DateItem-component
 * @returns a Datepicker for user input
 */

export const DatepickerItem: FC<IProps> = ({
  index,
  text,
  dateList,
  setDateList,
}) => {
  const [date, setDate] = useState(dateList[index] || 'dd.mm.åååå'); // The written value in the Datepicker field

  useEffect(() => {
    // If date is an empty string, set date to default value
    if (date === '') setDate('dd.mm.åååå');
    // Updates the array of dates if a date is selected
    const copyList: string[] = [...dateList];
    if (date !== 'dd.mm.åååå') {
      copyList[index] = date;
    }
    setDateList(copyList);
  }, [date]);

  return (
    <>
      <p className="typo-normal">{text}</p>
      <Datepicker onChange={setDate} value={date} />
    </>
  );
};
