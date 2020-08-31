import path from 'path'
import express from 'express'

import compile from './compile'
import upload from './upload'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname)))

let fileName = ''

app.post('/api/generate', (req, res) => {
    const { projectName, todayTask, tomorrowTask } = req.body
    const _todayString = todayTask.reduce((s, n, i) => s + `${i + 1}、${n}\n`, ''),
        _tomorrowString = tomorrowTask.reduce((s, n, i) => s + `${i + 1}、${n}\n`, '')
    compile(projectName, _todayString, _tomorrowString).then(data => {
        filename = data
        res.json({ code: 0 })
    }).catch(data => {
        fileName = data
        res.json({ code: 1 })
    })
})

app.post('/api/upload', (req, res) => {
    upload(fileName).then(() => res.json({ code: 0 }))
    // res.json({ code: 0 })
})

app.listen(port, err => {
    if(err) {
        return console.log(err)
    }

    console.log(`listen http://127.0.0.1:${port}`)
    console.log('press ctrl + c to stop to listen')
})
