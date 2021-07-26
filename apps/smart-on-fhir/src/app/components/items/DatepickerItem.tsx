import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';

interface IProps {
  index: number;
  text: string;
  dateList: string[];
  setDateList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DatepickerItem: FC<IProps> = ({
  index,
  text,
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
    <div style={{ display: 'block' }}>
      <p className="typo-normal">{text}</p>
      <Datepicker onChange={setDate} value={date} />
    </div>
  );
};
