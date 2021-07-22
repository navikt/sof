import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Input, Label } from 'nav-frontend-skjema';

//TODO: add functionality to event
const handleOnChange = () => {};

const InputItem = (props: any) => {
  return (
    <>
      {props.helptext !== '' ? (
        <div>
          <Input
            bredde="fullbredde"
            label={
              <div style={{ display: 'flex' }}>
                {props.question}
                <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
                  {props.helptext}
                </Hjelpetekst>
              </div>
            }
          />
        </div>
      ) : (
        <div>
          <Input label={props.question} />
        </div>
      )}
    </>
  );
};

export default InputItem;
