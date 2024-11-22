import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get('http://localhost:3000/gemini');
                console.log(res.data.questions);
                setQuiz(res.data.questions);
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            }

        }
        fetchQuiz();
    }, []);
    return (
        <>
            <div>{
                quiz?.map((que) => {
                    return <div>
                        <h3>{que.question}</h3>
                        <h5>{String(que.answer)}</h5>
                    </div>
                })
            }</div>
        </>
    );
}

export default Quiz;