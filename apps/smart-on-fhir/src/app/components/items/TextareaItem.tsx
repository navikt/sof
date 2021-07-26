import { Textarea } from 'nav-frontend-skjema';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { useEffect, useState } from 'react';
import { useFhirContext } from '../../context/fhirContext';
import { getAnswersFromServer } from '../../utils/setAnswersFromServer';

const TextareaItem = (props: IItemProps) => {
  const [textValue, setTextValue] = useState('');
  const { patient, client } = useFhirContext();

  const handleOnChange = (e: any) => {
    setTextValue(e.target.value);
  };

  /*useEffect(() => {
    client && patient
      ? getAnswersFromServer(client, patient, setTextValue, props.entity.linkId)
      : null;
    console.log('Text area utem');
  }, []);*/

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
