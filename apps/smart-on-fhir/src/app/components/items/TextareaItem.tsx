import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useEffect, useState } from 'react';

const TextareaItem = (props: IItemProps) => {
  const [textValue, setTextValue] = useState('');

  const handleOnChange = (e: any) => {
    setTextValue(e.target.value);
  };

  // When answers is updated: set the fields text to the correct answer.
  // It is only done if textValue is empty, meaning that it should only
  // make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  useEffect(() => {
    console.log(props.answers);
    if (
      textValue === '' &&
      typeof props.answers.get(props.entity.linkId) === 'string'
    ) {
      setTextValue(props.answers.get(props.entity.linkId) as string);
    }
  }, [props.answers]);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  return (
    <>
      {props.helptext != '' ? (
        <div className="componentItems">
          <Textarea
            label={
              <div style={{ display: 'flex' }}>
                {props.entity.text}
                <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            }
            value={textValue}
            style={{ maxWidth: '690px', marginBottom: '10px' }}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      ) : (
        <div className="componentItems">
          <Textarea
            label={props.entity.text}
            value={textValue}
            style={{ maxWidth: '690px', marginBottom: '10px' }}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      )}
    </>
  );
};

export default TextareaItem;
