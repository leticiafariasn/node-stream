import http from 'node:http'

const users = []

const server = http.createServer(async(req, res) => {
    const {method, url} = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const body = Buffer.concat(buffers).toString()
    console.log(body)
 
    if (method === "GET" && url ==='/users') {
        return res
        .setHeader('Content-Type', 'Application/json')
        .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            nome: 'Letícia Farias',
            email: 'leticiafarias@hotmail.com',
        })

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333);