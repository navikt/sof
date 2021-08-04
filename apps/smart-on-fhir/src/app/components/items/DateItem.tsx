import React, { FC, useState, useEffect } from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { DatepickerItem } from './DatepickerItem';
import { Feilmelding } from 'nav-frontend-typografi';

/**
 * Renders a question with type Date
 * @returns a calendar (DatepickerItem) for user input
 */

const DateItem: FC<IItemProps & savedType> = ({
  entity,
  helptext,
  answeroptions,
  answers,
  setAnswers,
  saved,
}) => {
  const optionList: string[] | undefined = answeroptions;
  const [dateList, setDateList] = useState<string[]>([]); // A (temporarily) list of the dates from the calendar input
  const [wrongDateStatus, setWrongDateStatus] = useState('riktig_dato');
  const [errorMsg, setErrorMsg] = useState('');

  const checkDate = () => {
    if (dateList.length === 2) {
      let firstDate = new Date(dateList[0]);
      let secondDate = new Date(dateList[1]);
      if (secondDate < firstDate) {
        setWrongDateStatus('ugyldigDato');
        setErrorMsg('Inntastet dato er ugyldig!');
      } else {
        setWrongDateStatus('riktig_dato');
        setErrorMsg('');
      }
    }
  };

  useEffect(() => {
    // Updates the array of answers, format defined in answerToJson.ts
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(entity.linkId, JSON.stringify(dateList));
    setAnswers(copiedAnswers);
    checkDate();
  }, [dateList]);

  // When input is saved:
  // set the date to the correct answer.
  // It is only done if the date is empty, meaning that it should only
  // make changes to date if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    //console.log('date');
    if (
      dateList.length === 0 &&
      answers.get(entity.linkId) &&
      typeof answers.get(entity.linkId) === 'string'
    ) {
      const temp: string = answers.get(entity.linkId) as string;
      setDateList(JSON.parse(temp));
    }
  }, [saved]);

  return (
    <div className="componentItems">
      <div
        className="titleBox"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <p className="typo-element">
          {entity.required ? entity.text : entity.text + ' (frivillig)'}
        </p>
        {
          // Checks for helptext, and displays if any
          helptext !== '' ? (
            <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
              {helptext}
            </Hjelpetekst>
          ) : (
            <></>
          )
        }
      </div>

      <div className="datesBox" style={{ display: 'flex' }}>
        {optionList?.length !== 0 ? (
          optionList?.map((option: string, index: number) => {
            return (
              <div
                key={entity.linkId + index}
                style={{ display: 'block', margin: '10px' }}
              >
                <div className={wrongDateStatus}>
                  <DatepickerItem
                    index={index}
                    text={option}
                    dateList={dateList}
                    setDateList={setDateList}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <DatepickerItem
            // Midltertidig løsning, antar datoene lagres i listeformat
            index={0}
            text={''}
            dateList={dateList}
            setDateList={setDateList}
          />
        )}
      </div>
      <Feilmelding>{errorMsg}</Feilmelding>
    </div>
  );
};

export default DateItem;
