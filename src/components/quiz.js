import React, {useState, useEffect} from "react";
import Alert from '@mui/material/Alert'
import styled from 'styled-components'
import axios from 'axios'

const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 10vh;
`;
const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2em auto;
    @media screen and (min-width: 1180px) {
        width: 50%;
    }
`;
const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: #616A94;
    background-color: #161A31;
    transition: 0.3s;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;
    
    @media screen and (min-width: 1180px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
`;

const Question = styled.div`
    width: 70%;
    margin: 0 auto;
`;
const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [right, setRight] = useState(false);
    const [number, setNumber] = useState(0);
    const userAnswer = (e) => {
        let userAnswer = e.target.outerText;
        if (questions[number].answer === userAnswer){
            setNumber(number + 1);
            setRight(true)

        } else {
            setRight(false)
        }
        

    }
    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple')
         .then(res => {
            setQuestions(res.data.results.map(item => (
                {
                    question: item.question,
                    options: [...item.incorrect_answers, item.correct_answer],
                    answer: item.correct_answer
                }

            )));
        })
        .catch(err => console.error(err))
       }, []);
    return (
        <QuizWindow>
            { questions[number] &&

                <>
                    <Question dangerouslySetInnerHTML={{ __html: questions[number].question }}></Question>

                    <Options>
                        {questions[number].options.map((item, index) => (
                            <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={userAnswer}></Option>
                        ))}
                    </Options>
                    <div>
                    {right ? <Alert severity="success">Correct!</Alert> : <Alert severity="error">Incorrect!</Alert>}        
                    </div>
                </>
            }
        </QuizWindow>
    )
}

export default Quiz;