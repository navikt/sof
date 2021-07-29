import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';
import '../questionnaireStylesheet.css';

//Expects to receive an array and a text
const CheckboxItem = (props: IItemProps) => {
  const optionarray: Array<string> | undefined = props.answeroptions;
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
      <div className="componentItems">
        <CheckboxGruppe legend={props.entity.text}>
          {optionarray?.map((option: string) => (
            <Checkbox
              key={option}
              label={
                props.helptext !== '' ? (
                  <div style={{ display: 'flex' }}>
                    {option}
                    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                      {props.helptext}
                    </Hjelpetekst>
                  </div>
                ) : (
                  option
                )
              }
            />
          ))}
        </CheckboxGruppe>
        ;
      </div>
    </>
  );
};

export default CheckboxItem;
