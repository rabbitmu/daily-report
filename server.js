import path from 'path'
import express from 'express'

import compile from './compile'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname)))

app.post('/api/generate', (req, res) => {
    const { projectName, todayTask, tomorrowTask } = req.body
    const _todayString = todayTask.reduce((s, n, i) => s + `${i + 1}、${n}\n`, ''),
        _tomorrowString = tomorrowTask.reduce((s, n, i) => s + `${i + 1}、${n}\n`, '')
    compile(projectName, _todayString, _tomorrowString).then(() => {
        res.json({ code: 0 })
    })
})

app.listen(port, err => {
    if(err) {
        return console.log(err)
    }

    console.log(`listen http://127.0.0.1:${port}`)
    console.log('press ctrl + c to stop to listen')
})
