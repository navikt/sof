import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { useEffect, useState } from 'react';
import '../questionnaireStylesheet.css';

//Expects to receive an array and a text
const CheckboxItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  const [textValue, setTextValue] = useState(false);
  const handleOnChange = (e: any) => {
    setTextValue(e.target.checked);
  };

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
