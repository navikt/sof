type answerOptionType = {
  valueCoding: {
    code: string;
    display: string;
  };
};

type itemType = {
  linkId: string;
  text: string;
  type: string;
  required: string;
  answerOption?: answerOptionType[];
  item?: itemType;
  enableWhen: {
    question: string;
    operator: string;
    answerCoding: { code: string };
  }[];
};

interface IItemProps {
  entity: itemType;
  helptext?: string;
  answers: Map<string, string | boolean>;
  answerOptions?: answerOptionType;
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}
