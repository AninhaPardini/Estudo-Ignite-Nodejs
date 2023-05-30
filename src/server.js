import http from 'node:http'

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req
    console.log(method, url)
    
    if(method === 'GET' && url === '/users') {
        //Early return: nada abaixo é executado
        return res
        .setHeader('Content-type', 'application/json')
        .end('Listagem de usuários:' + JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Heleninha',
            email: 'heleninha@example.com',
        })

        return res
        .writeHead(201)
        .end('Criação de usuário');
    }
    return res
    .writeHead(404)
    .end('NUM ACHEI NADA NAUM');
})

server.listen(3333);
//localhost:3333