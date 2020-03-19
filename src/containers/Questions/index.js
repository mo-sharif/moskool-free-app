import React, { useEffect, useState } from "react";

import { AuthUserContext, withAuthentication } from "../../components/Session";
import Grid from "@material-ui/core/Grid";
import QuestionCard from "./QuestionCard";
import MoPage from "../../components/shared/MoPage";
import MoLink from "../../components/shared/MoLink";
import * as ROUTES from "../../constants/routes";
const Questions = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  const QuestionsList = ({ authUser, questions }) => {
    if (authUser) {
      setUserPoints(authUser.points);
    }

    return questions.map((question, index) => (
      <React.Fragment key={index}>
        <QuestionCard
          userPoints={userPoints}
          question={question}
          index={index}
        />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    setLoading(true);
    const getQuestions = firebase
      .questions()
      .orderBy("id")
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let questions = [];
          snapshot.forEach(doc => {
            questions.push({
              ...doc.data(),
              uid: doc.id
            });
          });
          setQuestions(questions);
          setLoading(false);
        } else {
          setQuestions([]);
          setLoading(false);
        }
      });
    /* Unsubscribe from firebase on unmount */
    return () => {
      setQuestions([]);
      getQuestions();
    };
  }, [firebase]);

  return (
    <MoPage title="Easy" loading={loading} isCard={false}>
      {questions && (
        <AuthUserContext.Consumer>
          {authUser => (
            <>
              <div>
                {authUser && authUser.points ? (
                  <p>
                    <strong>{authUser.points}</strong> Points
                  </p>
                ) : (
                  <MoLink
                    text="Login to earn points and save progress"
                    href={ROUTES.SIGN_UP.path}
                  />
                )}
              </div>
              <Grid container spacing={4}>
                <QuestionsList authUser={authUser} questions={questions} />
              </Grid>
            </>
          )}
        </AuthUserContext.Consumer>
      )}
    </MoPage>
  );
};
export default withAuthentication(Questions);
