import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';
import { useInputErrorContext } from '../../context/inputErrorContext';

/**
 * Renders a question with type Choice
 * @returns radiobuttons with corresponding label
 */

const RadiobuttonItem = (props: IItemProps & savedType) => {
  const optionarray: Array<string> | undefined = props.answeroptions;
  const [radioValue, setRadioValue] = useState(''); // The label value of a checked radiobutton
  const [checked, setChecked] = useState<boolean[]>(
    new Array(optionarray?.length).fill(false)
  ); // A list of the options with true or false, depending on if checked
  const [inputError, setInputError] = useState('');
  const { isClicked, setIsClicked, foundError, setFoundError } =
    useInputErrorContext();

  const handleOnChange = (value: string, index: number) => {
    setRadioValue(value);
    const copyList: boolean[] = [...checked];
    copyList.map((bool: boolean, i: number) => {
      if (index === i) {
        copyList[i] = true;
      } else {
        copyList[i] = false;
      }
    });
    setChecked(copyList);
    setInputError('');
    setIsClicked && setIsClicked(false);
  };

  // When input is saved: set the radiobuttons to the correct answer.
  // It is only done if radioValue is empty, meaning that no button is checked,
  // it should only make changes to checked (list) if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    if (
      radioValue === '' &&
      props.answers.get(props.entity.linkId) &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      const temp: string = props.answers.get(props.entity.linkId) as string;
      optionarray?.map((text: string, index: number) => {
        if (text === temp) {
          checked[index] = true;
          setRadioValue(text);
        } else {
          checked[index] = false;
        }
      });
    }
  }, [props.saved]);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, radioValue);
    props.setAnswers(copiedAnswers);
  }, [radioValue]);

  useEffect(() => {
    props.entity.required = false;
    if (props.entity.required) {
      if (radioValue.length === 0 && isClicked) {
        setFoundError && setFoundError(true);
        setInputError('Det er obligatorisk å velge et alternaiv');
      } else setInputError('');
    }
    console.log('radio, check error');
  }, [isClicked]);

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
          feil={inputError}
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
