import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';

/**
 * Renders a question with type Choice
 * @returns radiobuttons with corresponding label
 */

const RadiobuttonItem = (props: IItemProps) => {
  const optionarray: Array<string> | undefined = props.answeroptions;
  const [radioValue, setRadioValue] = useState('');

  const handleOnChange = (e: any, value: string) => {
    setRadioValue(value);
  };

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, radioValue);
    props.setAnswers(copiedAnswers);
  }, [radioValue]);

  return (
    <>
      <div className="componentItems">
        <RadioGruppe
          legend={
            <div style={{ display: 'flex' }}>
              {props.entity.text}
              {
                // Checks for helptext, and displays if any
                props.helptext === '' ? (
                  <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                    {props.helptext}
                  </Hjelpetekst>
                ) : (
                  <></>
                )
              }
            </div>
          }
        >
          {optionarray?.map((option: string) => (
            <Radio
              onChange={(e: any) => handleOnChange(e, option)}
              key={option}
              label={option}
              name={'group' + props.entity.linkId}
            />
          ))}
        </RadioGruppe>
      </div>
    </>
  );
};

export default RadiobuttonItem;
