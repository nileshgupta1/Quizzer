const express = require('express');
const { fetchQuiz } = require('./gemini');
const data = require('./quiz.json');
const cors = require('cors');
const app = express();


app.use(cors());
app.get('/gemini', async (req, res) => {
    try {
        // const quizData = await fetchQuiz();
        // res.send(quizData);
        res.json(data.quiz);
    }
    catch (err) {
        console.error(err);
    }
});

app.listen(3000);