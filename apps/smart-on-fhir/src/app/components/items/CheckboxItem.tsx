import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';
import '../questionnaireStylesheet.css';

/**
 * This component renders a checkbox.
 * @param props should contain setAnswers, a help text, answers, an itemType.
 * @returns One checkbox
 */
//Expects to receive an array and a text
const CheckboxItem = (props: IItemProps & savedType) => {
  const optionarray: Array<string> | undefined = props.answeroptions;
  const [textValue, setTextValue] = useState(false);

  useEffect(() => {
    const copiedAnswers = new Map(props.answers);
    copiedAnswers.set(props.entity.linkId, textValue);
    props.setAnswers(copiedAnswers);
  }, [textValue]);

  // When input is saved: set the checkbox to the correct answer.
  // Make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  // (this might not work properly, maybe a value can be overwritten by the
  // answer in the server).
  useEffect(() => {
    if (typeof props.answers.get(props.entity.linkId) === 'boolean') {
      setTextValue(props.answers.get(props.entity.linkId) as boolean);
    }
  }, [props.saved]);

  return (
    <>
      <div className="componentItems">
        <CheckboxGruppe
          legend={
            props.entity.required === 'true'
              ? props.entity.text
              : props.entity.text + ' (frivillig)'
          }
        >
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
