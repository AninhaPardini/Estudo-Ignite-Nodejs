import http from 'node:http';
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)))
    }
}

// req => ReadableStream
//res => WritableStream

const server = http.createServer( async (req, res) => {
    const buffers = [];
    // Percorre a Stream e enquanto não terminar nada abaixo é executado.
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString();

    console.log(fullStreamContent);

    res.end(fullStreamContent)

    /* return req
        .pipe(new InverseNumberStream())
        .pipe(res) */
    
})

server.listen(3334);