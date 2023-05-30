## 💡 Principais Tópicos

- Requerimento do http é a base para construi aplicações e APIs. 
- CommonJS é o método de importação require
- ESModules é uma nova forma mais eficiente de importar através do import/exper
- Para usar o ESModules basta colocar o type: module no package.json
- Para modulos internos o uso do import deve linkar com o node: na frente.
- JSON - JavaScript Object Notation

--

## 🪄 Comandos Principais

## 🛣️ Rotas

- Rotas podem ter nomes iguais mas com metodos diferentes. Exemplo: GET /users => Buscando um usuário

## Requisições HTTP (Metodos)

- GET => Buscar um recurso do backend;
- POST => Criar um recurso;
- PUT => Editar/Atualizar um recurso e server para vários campos ao mesmo tempo (name, bio, email, user, avatar, url);
- PATCH => Atualizar uma informação especifica de um recurso no back-endespecífico (Aceitar notificações ou não, Fumante ou não);
- DELETE => Deletar um ou mais recursos do back-end.

## Headers

- Stateful: para salvar em memória o e depende dos dados em memória para funcionamento
- Stateless: não salva nada em memória mas sim em banco de dados
- [Headers](https://fetch.spec.whatwg.org/#concept-header-name) (Requisição/respota) => Metadados

## [HTTP Status Code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

São os códigos de status da requisição mostrando o que aconteceu com o que foi pedido. Os principais são: 

- Respostas Informativas (100-199);
- Respostas de Sucesso (200-299);
  - 201 => Criou ou Atualizou algo (POST/PUT)
- Respostas de Client Error (300-399);
- Respostas de Server erro (500-599); => Erro no back-end/banco de dados/API