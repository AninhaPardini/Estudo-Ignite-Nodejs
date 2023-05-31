export async function json(req, res) {
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

   res.setHeader('Content-type', 'application/json')
        
}