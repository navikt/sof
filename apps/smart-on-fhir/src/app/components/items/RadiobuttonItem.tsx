import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';

/**
 * Renders a question with type Choice
 * @returns radiobuttons with corresponding label
 */

const RadiobuttonItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  const [radioValue, setRadioValue] = useState('');

  const handleOnChange = (value: string) => {
    setRadioValue(value);
  };

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, radioValue);
    props.setAnswers(copiedAnswers);
  }, [radioValue]);

  return (
    <>
      {props.helptext != '' ? (
        <div className="componentItems">
          <RadioGruppe legend={props.entity.text}>
            {optionarray.map((item) => (
              <Radio
                onChange={() => handleOnChange(item)}
                key={item}
                label={
                  <div style={{ display: 'flex' }}>
                    {props.entity.text}
                    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                      {props.helptext}
                    </Hjelpetekst>
                  </div>
                }
                name={'group' + props.entity.linkId}
              />
            ))}
          </RadioGruppe>
        </div>
      ) : (
        <div className="componentItems">
          <RadioGruppe legend={props.entity.text}>
            {optionarray.map((item) => (
              <Radio
                onChange={() => handleOnChange(item)}
                key={item}
                label={item}
                name={'group' + props.entity.linkId}
              />
            ))}
          </RadioGruppe>
        </div>
      )}
    </>
  );
};

export default RadiobuttonItem;
