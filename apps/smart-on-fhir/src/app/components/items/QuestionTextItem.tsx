import Hjelpetekst from 'nav-frontend-hjelpetekst';

type QuestionTextItemProps = {
  mainQuestion: itemType;
  helptext?: string;
};

/**
 * Component to show the question.
 * @returns The text of the question and possibly a help text.
 */
export const QuestionTextItem = (props: QuestionTextItemProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {props.mainQuestion.required
        ? props.mainQuestion.text
        : props.mainQuestion.text + ' (frivillig)'}
      {props.helptext !== '' ? (
        <Hjelpetekst style={{ marginLeft: '0.5rem' }}>
          {props.helptext}
        </Hjelpetekst>
      ) : (
        <></>
      )}
    </div>
  );
};
