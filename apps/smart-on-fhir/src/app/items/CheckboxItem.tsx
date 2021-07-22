import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

const handleOnChange = () => {};

//Expects to receive an array and a text
const CheckboxItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  optionarray.forEach((element) => {
    console.log('CheckboxItem:', element);
  });

  return (
    <>
      {props.helptext != '' ? (
        <div>
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
        <div>
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
