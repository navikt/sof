import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';

const handleOnChange = () => {};

//Expects to receive an array and a text
const RadiobuttonItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  optionarray.forEach((element) => {
    console.log('Fra radiobutton:', element);
  });
  return (
    <>
      {props.helptext != '' ? (
        <div>
          <RadioGruppe legend={props.question}>
            {optionarray.map((item) => (
              <Radio
                key={item}
                label={
                  <div style={{ display: 'flex' }}>
                    {props.question}
                    <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                      {props.helptext}
                    </Hjelpetekst>
                  </div>
                }
                name={item}
              />
            ))}
          </RadioGruppe>
          ;
        </div>
      ) : (
        <div>
          <RadioGruppe legend={props.question}>
            {optionarray.map((item) => (
              <Radio key={item} label={item} name={item} />
            ))}
          </RadioGruppe>
          ;
        </div>
      )}
    </>
  );
};

export default RadiobuttonItem;
