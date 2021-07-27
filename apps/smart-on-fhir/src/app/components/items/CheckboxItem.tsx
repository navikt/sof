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

  return (
    <>
      {props.helptext != '' ? (
        <div className="componentItems">
          <CheckboxGruppe legend={props.entity.text}>
            {optionarray?.map((option: string) => (
              <Checkbox
                key={option}
                label={
                  <div style={{ display: 'flex' }}>
                    {option}
                    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                      {props.helptext}
                    </Hjelpetekst>
                  </div>
                }
                name={props.entity.linkId + option}
              />
            ))}
          </CheckboxGruppe>
          ;
        </div>
      ) : (
        <div className="componentItems">
          <CheckboxGruppe legend={props.entity.text}>
            {optionarray?.map((option: string) => (
              <Checkbox
                key={option}
                label={option}
                name={props.entity.linkId + option}
              />
            ))}
          </CheckboxGruppe>
        </div>
      )}
    </>
  );
};

export default CheckboxItem;
