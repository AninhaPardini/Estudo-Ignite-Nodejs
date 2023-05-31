import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database;
    
export const routes = [
    {
        method: 'GET',
            path : buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users');

            //Early return: nada abaixo é executado
            return res.end('Listagem de usuários:' + JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path : buildRoutePath('/users'),
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
        path : buildRoutePath('/users/:'),
        handler: (req, res) => {
            return res.end()

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:'),
        handler: (req, res) => {
            return res.end()

        }
    },
]