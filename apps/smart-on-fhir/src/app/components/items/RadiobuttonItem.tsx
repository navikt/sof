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

  const handleOnChange = (value: string) => {
    console.log('onChange');
    setRadioValue(value);
  };

  // When answers is updated: set the radiobuttons to the correct answer.
  // It is only done if radioValue is empty, meaning that it should only
  // make changes to radioValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  // Does not currently work. Maybe we can get e.target from onChange and do something.
  useEffect(() => {
    //console.log('Skriver ut fra RadioButton', props.answers);
    if (
      radioValue === '' &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      setRadioValue(props.answers.get(props.entity.linkId) as string);
    }
  }, [props.answers]);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    console.log('radioValue: ', radioValue);
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
                props.helptext !== '' ? (
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
              onChange={() => handleOnChange(option)}
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
