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

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
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
