import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import '.././components/questionnaireStylesheet.css';

const handleOnChange = () => {};

//Expects to receive an array and a text
const CheckboxItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;

  return (
    <>
      {props.helptext != '' ? (
        <div className="componentItems">
          <CheckboxGruppe legend={props.question}>
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
          <CheckboxGruppe legend={props.question}>
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
