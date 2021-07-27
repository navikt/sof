import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useEffect, useState } from 'react';

/**
 * Renders a question with type Text
 * @returns a text box (TextArea) for user input
 */
const TextareaItem = (props: IItemProps) => {
  const [textValue, setTextValue] = useState('');

  const handleOnChange = (e: any) => {
    setTextValue(e.target.value);
  };

  // When rendering for the first time: set the fields text to the correct answer.
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
  }, []);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  return (
    <>
      {
        <div className="componentItems">
          <Textarea
            label={
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
            value={textValue}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      }
    </>
  );
};

export default TextareaItem;
