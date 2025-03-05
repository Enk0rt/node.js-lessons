const start = async () => {
    const path = require('path')
    const fs = require("fs")
    const afs = require("node:fs/promises")
    const readLine = require('readline')

    const source = path.join(process.cwd(), 'storage', 'emails.txt')

    const fileStream = fs.createReadStream(source, 'utf-8')
    const rl = readLine.createInterface({input: fileStream})

    try {

        for await (const line of rl) {
            const email = line.split('\t').splice(-1)[0]
            const emailSplit = email.split('@')

            if (emailSplit.length !== 2) continue

            const domainName = emailSplit.splice(-1)[0]
            const fileName = `${domainName}.txt`
            console.log(email)
            await afs.appendFile(path.join(process.cwd(), 'emails', fileName), `${email}\n`)

        }

    } finally {
        rl.close()
    }
}

start()

//Щоб створити файли введіть в консолі - node main.js

