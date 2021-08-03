import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';

interface IProps {
  index: number;
  text: string;
  dateList: string[][];
  setDateList: React.Dispatch<React.SetStateAction<string[][]>>;
}

/**
 * DatepickerItem displays a calender for input
 * Currently used together with DateItem-component.
 * Functionality to add for example several start and end dates
 * (like we do in pleiepengeskjema question 1), is not currently added
 * for dates. Then, a function to correctly update arrayIndex must be made.
 * @returns a Datepicker for user input
 */

export const DatepickerItem: FC<IProps> = ({
  index,
  text,
  dateList,
  setDateList,
}) => {
  const arrayIndex: number = 0; // Says which index in dateList the new list is being stored at
  const [date, setDate] = useState(
    dateList[arrayIndex] ? dateList[arrayIndex][index] : 'dd.mm.åååå'
  ); // The written value in the Datepicker / input field

  useEffect(() => {
    // If date is an empty string, set date to default value
    if (date === '') setDate('dd.mm.åååå');
    // Updates the array of dates if a date is selected
    const copyList: string[][] = [...dateList];
    if (date !== 'dd.mm.åååå') {
      copyList[arrayIndex]
        ? (copyList[arrayIndex][index] = date)
        : copyList.push([date]);
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
