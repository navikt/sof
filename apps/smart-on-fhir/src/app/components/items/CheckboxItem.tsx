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
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>();
  //^^A list for saving the checkbox values. Each element in the
  // list belongs to the corresponding checbox. The first element
  // belongs to the first checbox, etc.

  // Start with a list with all false values
  useEffect(() => {
    setCheckboxValues(Array(optionarray?.length).fill(false));
  }, []);

  // When input is saved: set the checkbox to the correct answer.
  // Make changes to textValue if there is an answer saved on the server
  // that has been fetched, and there is no new answer that can be overwritten.
  // (this might not work properly, maybe a value can be overwritten by the
  // answer in the server).
  useEffect(() => {
    if (typeof props.answers.get(props.entity.linkId) === 'boolean') {
      //setCheckboxValues(props.answers.get(props.entity.linkId) as boolean);
    }
  }, [props.saved]);

  // When checkboxValues are updated, set answers as well
  useEffect(() => {
    if (checkboxValues && checkboxValues.length > 0) {
      const copiedAnswers = new Map(props.answers);
      for (let i = 0; i < checkboxValues.length; i++) {
        copiedAnswers.set(
          props.entity.linkId + '.' + (i + 1),
          checkboxValues[i]
        );
      }
      props.setAnswers(copiedAnswers);
    }
  }, [checkboxValues]);

  // Function to update checkboxValues when a checbox is clicked
  const onClickCheckbox = (index: number) => {
    if (checkboxValues) {
      const tempList = [...checkboxValues];
      tempList[index] = !checkboxValues[index];
      setCheckboxValues(tempList);
    }
    console.log(checkboxValues);
  };

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
          {optionarray?.map((option: string, index: number) => (
            <Checkbox
              onClick={() => onClickCheckbox(index)}
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
      </div>
    </>
  );
};

export default CheckboxItem;
