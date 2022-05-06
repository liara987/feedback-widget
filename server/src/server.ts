import express from 'express'

const app = express()

app.get('/users', (req, res) => {
    return res.send('teste')
})

app.listen(3333, () => {
    console.log('Server running on port 3333');
})