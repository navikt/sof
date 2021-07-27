import { Cell, ContentContainer, Grid } from '@navikt/ds-react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { EtikettFokus, EtikettInfo } from 'nav-frontend-etiketter';

interface IQuestionnaireLinksProps {
  title: string;
  status: boolean;
  handleClick: any;
}

const QuestionnaireLinks = (props: IQuestionnaireLinksProps) => {
  function statusChecker(params: boolean) {
    if (props.status) {
      return <EtikettInfo className="etiketter">Ikke startet</EtikettInfo>;
    } else {
      return <EtikettFokus className="etiketter">Utkast</EtikettFokus>;
    }
  }

  return (
    <div className="questionnaireLinkContainer" onClick={props.handleClick}>
      <ContentContainer className="ContentContainer">
        <Grid>
          <Cell className={'navds-story-cell tittelcelle'} xs={8}>
            {props.title}
          </Cell>
          <Cell className={'navds-story-cell statuscelle'} xs={3}>
            Status:
            {statusChecker(props.status)}
          </Cell>
          <Cell className={'navds-story-cell chevroncelle'} xs={1}>
            <HoyreChevron></HoyreChevron>
          </Cell>
        </Grid>
      </ContentContainer>
    </div>
  );
};

export default QuestionnaireLinks;
