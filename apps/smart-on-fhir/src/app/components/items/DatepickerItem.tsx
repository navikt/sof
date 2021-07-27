import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';

interface IProps {
  index: number;
  text: string;
  dateList: string[];
  setDateList: React.Dispatch<React.SetStateAction<string[]>>;
  answers: Map<string, string | boolean>;
  entity: itemType;
}

/**
 * Currently used together with DateItem-component
 * @returns a Datepicker for user input
 */

export const DatepickerItem: FC<IProps> = ({
  index,
  text,
  dateList,
  setDateList,
  answers,
  entity,
}) => {
  const [date, setDate] = useState('dd.mm.åååå');

  useEffect(() => {
    const copyList: string[] = [...dateList];
    if (date !== 'dd.mm.åååå') {
      copyList[index] = date;
    }
    setDateList(copyList);
  }, [date]);

  // When answers is updated: set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    console.log(answers);
    if (
      date === 'dd.mm.åååå' &&
      typeof answers.get(entity.linkId) === 'string'
    ) {
      setDate(answers.get(entity.linkId) as string);
    }
  }, [answers]);

  return (
    <>
      <p className="typo-normal">{text}</p>
      <Datepicker onChange={setDate} value={date} />
    </>
  );
};
