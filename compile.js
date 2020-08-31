import path from 'path'
import fs from 'fs'

const doublefy = n => n >= 10 ? n : `0${n}`
const formatDate = time => {
    const date = new Date()
    if(time) {
        date.setTime(time)
    }
    return `${doublefy(date.getFullYear())}.${doublefy(date.getMonth() + 1)}.${doublefy(date.getDate())}`
}

export default (projectName, today, tomorrow) => new Promise((resolve, reject) => {
    const date = new Date()
    const userName = '穆名'
    const template = `【${formatDate()}-工作总结-${userName}】\n 项目工作：\n ${projectName}\n ${today}\n\n ------------------------------------------------------------------------\n【${formatDate(new Date().getTime() + 86400000)}-工作计划-${userName}】\n ${tomorrow}`
    const fileName = `${userName}${formatDate()}工作总结与工作计划.txt`
    const distPath = path.join(__dirname, 'dist')
    const filePath = `${distPath}/${fileName}`

    if(!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    } else {
        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, template)
            resolve(fileName)
        } else {
            reject(fileName)
        }
    }
})
