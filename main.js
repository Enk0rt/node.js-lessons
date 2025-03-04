const start = async () => {
    const path = require('path')
    const fs = require("fs")
    const readLine = require('readline')

    const emails = path.join(process.cwd(), 'storage', 'emails.txt')

    const gmailCom = path.join(process.cwd(), 'gmail.txt')
    const mailRu = path.join(process.cwd(), 'mail.txt')
    const plusgmailRu = path.join(process.cwd(), 'plusgmail.txt')

    const fileStream = fs.createReadStream(emails, 'utf-8')
    const rl = readLine.createInterface({input: fileStream})

    try {
        for await (const line of rl) {
            const mail = /\b[A-Za-z0-9._%+-]+@mail\.ru\b/
            const gmail = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/
            const plusGmail = /\b[A-Za-z0-9._%+-]+@plusgmail\.ru\b/

            if (line.match(mail)) {
                await fs.appendFile(mailRu, line+'\n', () => {
                    console.log(`${line}\n`)
                })
            } else if (line.match(gmail)) {
                await fs.appendFile(gmailCom, line+'\n', () => {
                    console.log(`${line}\n`)
                })
            } else if (line.match(plusGmail)) {
                await fs.appendFile(plusgmailRu, line+'\n', () => {
                    console.log(`${line}\n`)
                })
            }
        }
    }
    finally
    {
        rl.close()
    }
}

start()

//Щоб створити файли введіть в консолі - node main.js

