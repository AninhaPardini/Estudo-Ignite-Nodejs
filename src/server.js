import http from 'node:http'
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer( async (req, res) => {
    const { method, url } = req
    console.log(method, url);
    
    await json(req, res);

    if(method === 'GET' && url === '/users') {
        //Early return: nada abaixo é executado
        return res.end('Listagem de usuários:' + JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
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