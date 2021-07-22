import { Radio } from 'nav-frontend-skjema';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

interface IProps {
  linkId: string;
  answerOptions: any;
  answers: Map<string, string | boolean>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

export const AnswerInputRadiobuttons: FC<IProps> = ({
  linkId,
  answerOptions,
  answers,
  setAnswers,
}) => {
  const [radioValue, setRadioValue] = useState('');

  const handleOnChange = (value: string) => {
    setRadioValue(value);
  };

  useEffect(() => {
    const copiedAnswers = new Map(answers);
    copiedAnswers.set(linkId, radioValue);
    setAnswers(copiedAnswers);
  }, [radioValue]);

  return (
    <>
      {answerOptions?.map((option: any) => {
        const displayText: string = option.valueCoding.display;
        return (
          <Radio
            label={displayText}
            name={'group' + linkId}
            onChange={() => handleOnChange(displayText)}
          />
        );
      })}
    </>
  );
};
