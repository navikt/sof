import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';

interface IProps {
  index: number;
  dateList: string[];
  setDateList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DatepickerItem: FC<IProps> = ({
  index,
  dateList,
  setDateList,
}) => {
  const [date, setDate] = useState('åååå.mm.dd');

  useEffect(() => {
    const copyList: string[] = [...dateList];
    if (date !== 'åååå.mm.dd') {
      copyList[index] = date;
    }
    setDateList(copyList);
  }, [date]);

  return (
    <>
      <Datepicker onChange={setDate} value={date} />
    </>
  );
};
