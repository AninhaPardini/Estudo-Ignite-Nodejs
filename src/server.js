import http from 'node:http'

const users = [];

const server = http.createServer( async (req, res) => {
    const { method, url } = req
    console.log(method, url)

    const buffers = [];
    // Percorre a Stream e enquanto não terminar nada abaixo é executado.
    for await (const chunk of req) {
        buffers.push(chunk)
    }

   try {
     req.body = JSON.parse(Buffer.concat(buffers).toString())
   } catch {
    req.body = null
   }

    console.log(req.body)
    
    if(method === 'GET' && url === '/users') {
        //Early return: nada abaixo é executado
        return res
        .setHeader('Content-type', 'application/json')
        .end('Listagem de usuários:' + JSON.stringify(users));
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