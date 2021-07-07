import React, { FC, useState } from "react";
import { QuestionnaireResponse } from "./QuestionnaireResponse";

interface IProps {
	linkId: string;
	answers: { linkId: string; answer: { valueString: string }[] }[];
	setAnswers: React.Dispatch<
		React.SetStateAction<
			{ linkId: string; answer: { valueString: string }[] }[]
		>
	>;
}

export const ItemAnswer: FC<IProps> = ({ linkId, answers, setAnswers }) => {
	const handleOnChange = (e: any) => {
		// Legger til nytt svar.. Hvordan legge til bare et svar per linkId?
		setAnswers([
			...answers,
			{ linkId: linkId, answer: [{ valueString: e.target.value }] },
		]);
	};

	return (
		<>
			<input type="text" onChange={handleOnChange} />
			<p>{linkId}</p>
		</>
	);
};
