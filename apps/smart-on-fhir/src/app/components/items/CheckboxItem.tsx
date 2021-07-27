import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';
import '../questionnaireStylesheet.css';

//Expects to receive an array and a text
const CheckboxItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  const [textValue, setTextValue] = useState(false);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  // When answers is updated: set the checkbox to the correct answer.
  // Make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  // (this might not work properly, maybe a value can be overwritten by the
  // answer in the server).
  useEffect(() => {
    console.log(props.answers);
    if (typeof props.answers.get(props.entity.linkId) === 'boolean') {
      setTextValue(props.answers.get(props.entity.linkId) as boolean);
    }
  }, [props.answers]);

  return (
    <>
      {props.helptext != '' ? (
        <div className="componentItems">
          <CheckboxGruppe legend={props.entity.text}>
            {optionarray.map((item) => (
              <Checkbox
                key={item}
                label={
                  <div style={{ display: 'flex' }}>
                    {item}
                    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                      {props.helptext}
                    </Hjelpetekst>
                  </div>
                }
                name={item.text}
              />
            ))}
          </CheckboxGruppe>
          ;
        </div>
      ) : (
        <div className="componentItems">
          <CheckboxGruppe legend={props.entity.text}>
            {optionarray.map((item) => (
              <Checkbox key={item} label={item} name={item.text} />
            ))}
          </CheckboxGruppe>
        </div>
      )}
    </>
  );
};

export default CheckboxItem;
