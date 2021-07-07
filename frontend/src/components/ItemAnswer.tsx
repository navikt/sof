import React, { FC, useState } from "react";
import { QuestionnaireResponse } from "./QuestionnaireResponse";

interface IProps {
	linkId: string;
	setAnswers: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

export const ItemAnswer: FC<IProps> = ({ linkId, setAnswers }) => {
	//const itemAnswer: string = props.answer;
	//const [answer, setAnswer] = useState<string>("");

	return (
		<>
			<input
				type="text"
				onChange={(e) => {
					setAnswers(linkId, e.target.value);
				}}
			/>
			<p>{answer}</p>
			<p>{linkId}</p>
		</>
	);
};
