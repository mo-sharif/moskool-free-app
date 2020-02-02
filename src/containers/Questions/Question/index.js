import React, { useEffect, useState } from "react";

import * as ROUTES from "../../../constants/routes";

import { AuthUserContext } from "../../../components/Session";
import CodeEditor from "../../../components/CodeEditor";
import CongratsCard from "../CongratsCard";
import PageHeader from "../../../components/shared/PageHeader";
import Spinner from "../../../components/shared/Spinner";
import { withAuthentication } from "../../../components/Session";

const Question = ({ firebase, history, match }) => {
	const [loading, setLoading] = useState(true);
	const [question, setQuestion] = useState({});
	const [isCorrect, setIsCorrect] = useState(false);

	const getQuestionById = id => {
		firebase.getQuestionById(id).onSnapshot(snapshot => {
			if (snapshot.size) {
				let question = [];
				snapshot.forEach(doc => question.push({ ...doc.data(), uid: doc.id }));
				history.push(ROUTES.QUESTIONS.path + "/" + question[0].slug);
				setQuestion(question[0]);
			} else {
				setQuestion({});
				setIsCorrect(false);
			}
		});
	};

	useEffect(() => {
		const slug = match.params.question;
		setLoading(true);
		setIsCorrect(false);
		const unsubscribe = firebase.question(slug).onSnapshot(snapshot => {
			setQuestion(snapshot.data());
			setLoading(false);
		});

		return () => unsubscribe();
	}, [firebase, match]);

	return (
		<>
			<PageHeader img="" title="Questions" history={history} />
			<Spinner loading={loading} color="primary" />

			<CodeEditor
				question={question}
				setIsCorrect={isCorrect => setIsCorrect(isCorrect)}
			/>

			<AuthUserContext.Consumer>
				{authUser => (
					<CongratsCard
						isActive={isCorrect}
						authUser={authUser}
						triggerNextQuestion={() => getQuestionById(Number(question.id) + 1)}
					/>
				)}
			</AuthUserContext.Consumer>
		</>
	);
};
export default withAuthentication(Question);
