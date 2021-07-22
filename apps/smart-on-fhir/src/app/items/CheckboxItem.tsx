import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

const handleOnChange = () => {};

//Expects to receive an array and a text
const CheckboxItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;

  return (
    <>
      {props.helptext != undefined ? (
        <div>
          <CheckboxGruppe legend={props.question}>
            {optionarray.map((item, id) => (
              <Checkbox
                label={
                  <div style={{ display: 'flex' }}>
                    {props.question}
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
        <div>
          <CheckboxGruppe legend={props.question}>
            {optionarray.map((item, id) => (
              <Checkbox label={item.text} name={item.text} />
            ))}
          </CheckboxGruppe>
        </div>
      )}
    </>
  );
};

export default CheckboxItem;
