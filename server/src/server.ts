import express from 'express'

const app = express()

app.use(express.json())

app.post('/feedbacks', (req, res) => {
    console.log(req.body);

    return res.send('teste')
})

app.listen(3333, () => {
    console.log('Server running on port 3333');
})