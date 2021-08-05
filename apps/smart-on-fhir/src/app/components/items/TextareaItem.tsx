import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useEffect, useState } from 'react';
import { useInputErrorContext } from '../../context/inputErrorContext';

/**
 * Renders a question with type Text
 * @returns a text box (TextArea) for user input
 */

const TextareaItem = (props: IItemProps & savedType) => {
  const [textValue, setTextValue] = useState('');
  const [inputError, setInputError] = useState('');
  const { isClicked, setIsClicked } = useInputErrorContext();

  const handleOnChange = (e: any) => {
    setTextValue(e.target.value);
    setIsClicked && setIsClicked(false);
  };

  // When input is saved: set the fields text to the correct answer.
  // It is only done if textValue is empty, meaning that it should only
  // make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    if (
      textValue === '' &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      setTextValue(props.answers.get(props.entity.linkId) as string);
    }
  }, [props.saved]);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  // Checks for missing input if required
  useEffect(() => {
    if (props.entity.required) {
      if (textValue.length === 0 && isClicked) {
        setInputError('Det er obligatorisk å fylle inn');
      } else {
        setInputError('');
      }
    }
  }, [isClicked]);

  return (
    <>
      {
        <div className="componentItems">
          <Textarea
            label={
              props.helptext !== '' ? (
                <div style={{ display: 'flex' }}>
                  {props.entity.required
                    ? props.entity.text
                    : props.entity.text + ' (frivillig)'}
                  <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                    {props.helptext}
                  </Hjelpetekst>
                </div>
              ) : props.entity.required ? (
                props.entity.text
              ) : (
                props.entity.text + ' (frivillig)'
              )
            }
            value={textValue}
            onChange={handleOnChange}
            maxLength={0}
            feil={inputError}
          ></Textarea>
        </div>
      }
    </>
  );
};

export default TextareaItem;
