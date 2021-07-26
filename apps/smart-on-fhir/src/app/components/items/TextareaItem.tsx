import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useEffect, useState } from 'react';

const TextareaItem = (props: any) => {
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
      {props.helptext !== '' ? (
        <div className="componentItems">
          <Textarea
            className="inputTextAreas"
            label={
              <div style={{ display: 'flex' }}>
                {props.entity.text}
                <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            }
            value={textValue}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      ) : (
        <div className="componentItems">
          <Textarea
            className="inputTextAreas"
            label={props.entity.text}
            value={textValue}
            onChange={handleOnChange}
            maxLength={0}
          ></Textarea>
        </div>
      )}
    </>
  );
};

export default TextareaItem;
