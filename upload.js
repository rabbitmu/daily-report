import path from 'path'
import Client from 'ssh2-sftp-client'

const dateString = () => {
    const date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate()
    }
}
const date = dateString()
const serverPath = `/home/eric/fileshare/公司文档资料/总结与计划/个人/日/穆名/${date.year}年/${date.month}月`

export default fileName => new Promise(resolve => {
    const ftp = new Client()
    ftp.connect({
        host: '10.10.168.250',
        user: 'eric',
        password: 'calis@123'
    }).then(() => {
        ftp.fastPut(path.join(__dirname, 'dist', fileName), `${serverPath}/${fileName}`).then(() => {
            resolve()
        })
    })
})

