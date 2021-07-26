import React, { FC, useState, useEffect } from 'react';
import { Datepicker } from 'nav-datovelger';
import { DatepickerItem } from './DatepickerItem';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
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

//Expects to receive an array with texts for "start" and "end"
const DateItem: FC<IProps> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
}) => {
  const [dateList, setDateList] = useState<string[]>([]);
  const optionarray: string[] = answeroptions;

  useEffect(() => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, dateList.toString());
    setAnswers(copiedAnswers);
  }, [dateList]);

  return (
    <div className="componentItems">
      <p
        className="typo-element"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {entity.linkId} {entity.text}
        <HelptextItem text={helptext} />
      </p>
      <div style={{ display: 'flex' }}>
        {optionarray?.map((option: string, index: number) => {
          return (
            <div style={{ display: 'block' }}>
              <p className="typo-normal">{option}</p>
              <DatepickerItem
                index={index}
                dateList={dateList}
                setDateList={setDateList}
              />
              {console.log('ID link:', entity.linkId)}
            </div>
          );
        })}
      </div>
      {console.log('Dates:', dateList)}
    </div>
  );
};

export default DateItem;
