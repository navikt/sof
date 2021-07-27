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
  const [checked, setChecked] = useState<boolean[]>(
    new Array(optionarray?.length).fill(false)
  );

  const handleOnChange = (value: string, index: number) => {
    setRadioValue(value);
    console.log(checked);
    console.log(index);
    const copyList: boolean[] = [...checked];
    copyList.map((bool: boolean, i: number) => {
      if (index === i) {
        copyList[i] = true;
      } else {
        copyList[i] = false;
      }
    });
    copyList[index] = true;
    setChecked(copyList);
  };

  // When answers is updated: set the radiobuttons to the correct answer.
  // It is only done if radioValue is empty, meaning that it should only
  // make changes to radioValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  // Does not currently work. Maybe we can get e.target from onChange and do something.
  useEffect(() => {
    if (
      radioValue !== '' &&
      props.answers.get(props.entity.linkId) &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      const temp: string = props.answers.get(props.entity.linkId) as string;
      optionarray?.map((text: string, index: number) => {
        if (text === temp) {
          checked[index] = true;
        } else {
          checked[index] = false;
        }
      });
    }
  }, []);

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
            props.helptext !== '' ? (
              <div style={{ display: 'flex' }}>
                {props.entity.text}
                <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            ) : (
              props.entity.text
            )
          }
        >
          {optionarray?.map((option: string, index: number) => (
            <Radio
              onChange={() => handleOnChange(option, index)}
              key={option}
              label={option}
              name={'group' + props.entity.linkId}
              checked={checked[index]}
            />
          ))}
        </RadioGruppe>
      </div>
    </>
  );
};

export default RadiobuttonItem;
