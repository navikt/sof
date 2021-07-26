import React, { FC, useState, useEffect } from 'react';
import { DatepickerItem } from './DatepickerItem';
import { HelptextItem } from './HelptextItem';

interface IProps {
  entity: any;
  helptext: string;
  answeroptions: string[];
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

const DateItem: FC<IProps> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
}) => {
  const [dateList, setDateList] = useState<string[]>([]);
  const optionList: string[] = answeroptions;

  useEffect(() => {
    // // Formaterer listen slik at inputsvarene kan tolkes av answerToJson.ts
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, '[' + dateList.toString() + ']');
    setAnswers(copiedAnswers);
  }, [dateList]);

  return (
    <div className="componentItems">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p className="typo-element">{entity.text}</p>
        <HelptextItem text={helptext} />
      </div>
      <div style={{ display: 'flex' }}>
        {optionList?.map((option: string, index: number) => {
          return (
            <DatepickerItem
              index={index}
              text={option}
              dateList={dateList}
              setDateList={setDateList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DateItem;
