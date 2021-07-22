import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';

const handleOnChange = () => {};

//Expects to receive an array and a text
const RadiobuttonItem = (props: any) => {
  const optionarray: Array<any> = props.answeroptions;
  return (
    <>
      {props.helptext != undefined ? (
        <div>
          <RadioGruppe legend={props.question}>
            {optionarray.map((item, id) => (
              <Radio
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
          </RadioGruppe>
          ;
        </div>
      ) : (
        <div>
          <RadioGruppe legend={props.question}>
            {optionarray.map((item, id) => (
              <Radio label={item.text} name={item.text} />
            ))}
          </RadioGruppe>
          ;
        </div>
      )}
    </>
  );
};

export default RadiobuttonItem;
