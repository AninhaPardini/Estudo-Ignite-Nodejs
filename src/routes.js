import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database;

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users');

            //Early return: nada abaixo é executado
            return res.end('Listagem de usuários:' + JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, email } = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user)

            return res
            .writeHead(201)
            .end('Criação de usuário');
        }
    },
    {
        method: 'PUT',
        path: '/users',
        handler: (req, res) => {


        }
    },
    {
        method: 'DELETE',
        path: '/users/',
        handler: (req, res) => {
            return res.end()

        }
    },
]