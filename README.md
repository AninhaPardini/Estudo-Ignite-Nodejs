# BACK-END: Conceitos Básicos

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

# NODEJS: Estudos e Conceitos

## STREAMS

As principais cases são de Writable Streams como Netflix e Spotify, o Streams trabalha em ler pequenas partes do conteúdo inteiro para ir entregando-as e fazendo as inserções lidas a cada bloco baixados.

Outro caso de uso Readable Streams é importação de clientes via CSV (Excel) onde o cliente envia seu documento e é baixado aos poucos e lido cada bloco baixado em conjunto.

Supondo que o usuário envia 1gb de arquivo.

1gb -1.000.000
10mb/s - 100s

Dentro destes 100s ele está lendo cada linha que sobe e fazendo inserções no banco de dados.

### Fundamentos

- STDIN E STDOUT

STDIN é tudo que o usuário digita no terminal e é uma Readable Streams, ele coleta/lê os dados enviados.

STDOU ele é uma Writable Streams que retorna/escreve os dados.

O pipe é utilizado para encaminhar para uma saída o que foi pego no stdin.

Uma stream não lê dados simples como boleano, string, numbers, então é necessário converter em um Buffer, que não aceita dados em forma de número, apenas em string.

Para o Writable utilizamos o _write com 3 parâmetros:

1. Chunk: É o que foi lido pela function Readable, neste caso é o buf;
2. Encoding: É a forma como essa informação foi decodificada;
3. Callback: É uma função que a Writable precisa chamar quando terminou de fazer a ação com a informação do Chunk e Encoding;

Uma Stream de escrita nunca transforma nada, apenas processa o dado.

A Stream Transform é feita justamente para isso, nela temos igual ao Writable, um _transform com os três parâmetros, Chunk, Encoding e Callback, com isso o callback tem dois parâmetros, a reação esperada caso haja erro, e o dado para transformar.

💡 Lembrando: O dado do tem que ser em Buffer para realizar a leitura pelo stdout.

### Buffer

É uma representação de um espaço na memória do computador(guarda os dados de forma binaria), usado para transitar dados de uma forma muito rápida, são feitos para serem tratados e removidos logo em seguida, dados temporários.


## Introduzindo Streams no http

Criei um servidor e coloquei a Stream Readable para ler o fake upload construido dentro por um Transform Stream, usando o metodo fetch no fake-upload.

❗ TypeError: RequestInit: duplex option is required when sending a body

✅ Agora na nova versão lts do Node é preciso adicionar no fetch o [duplex: 'half'](https://fetch.spec.whatwg.org/#dom-requestinit-duplex) é o único valor válido e é para iniciar uma busca half-duplex (ou seja, o agente do usuário envia toda a solicitação antes de processar a resposta).

## Corpo da requisição em JSON

Para consumir a Stream por completo usei do metodo for com await para esperar os dados serem lidos por completo e armazenando na constante buffers.

Como o documento armazenado no buffers era em uma formatação ilegivel para res, transformei-o em JSON usando parse e caso não tenha nada dentro do JSON ele retornará null. Então removi o usuário que estava como teste e adicionei o name e email desestruturado para responder o GET.

## Middleware

É um interceptador, uma função que irá receber sempre os parâmetros req e res e pode ter funções como lidar com os tipos de transformações, por exemplo o json que foi criado que pega tanto as respostas quanto as leituras em JSON.

## Banco de dados

Criei um arquivo em src para fazer o filtro da database, selecionando a tabela e oq será inserido, neste caso vou ter uma data base como objeto users que dentro dele tem outro objeto com as datas dos usuários.

Em select fiz uma variante que armazena se receber um objeto ele mostra, se não manda uma array vazia.

E no insert selecionei a tabela e a data que será colocada, se tiver um array dentro(dados de usuário) do database retorna pushando o data pra dentro do data selecionado, se não cria um novo array e retorna o item dentro.

💡 Importante: transformar o database como inacessavel forá do escopo montado entre outros fluxos importantes para envio de dados, se utiliza o '#' na frente de todas as chamadas.

### Persist

Usando o fs para converter os dados em um arquivo, usei o metodo persist para escrever um arquivo e como parâmetro coloquei o nome dele e transformei o database em json.

💡 Importante: O arquivo db é criado apartir do local que está se executando a aplicação, se der cd /src e executar o server ele irá criar dentro do src, caso cotrário irá para raiz.

Para poder acessar os dados depois que o servidor estiver reiniciado e se não houver arquivo ele irá criar um vázio.

## Criando UUID (id unico universal)

Usando a função randomUUID dentro do modulo crypto e chamei a funçãp dentro do objeto de id do usuário.

## Rota da aplicação

### Separando as rotas

Para deixar o código mais limpo e uma performace melhor na procura de rotas criei um arquivo para armazena-las como objeto, então tirei de dentro do server os imports chamados pelas rotas e adicionei ao arquivo de routes, depois armazenei uma variante para achar as rotas e coloquei uma regra de se o metodo da rota for igual ao metodo req, e o caminho da rota for igual a url ele irá retornar o dado do routes, depois adicionei o filtro que se hovuer router, retornar o handler com os parâmetros de requisição e resposta.

### Route e Query parameters

Existem 3 formas do frontend ou aplicação a enviar informação para nossa API

1. Query parametres -> São parametros nomeados: http://localhost:3333/users?userId=1&name=Yanzinho -> Nele você busca de forma nomeada a informação que deseja, e usando & para concatenar.

🔗 url Stateful
💡 Importante: É uma forma mais utilizada para filtros, paginação. sistema de busca sem afetar dados sensiveis e não são informações obrigatórias

2. Route Parametres -> São parametros não nomeados que também ficam na rota: http://localhost:3333/users/1(procurando com o metodo GET o usuário de Id 1) Geralmente são usados para identificação de recursos e também não pode ser usado para envio de informações sensíveis.
3. Request Body -> Envio de informações de um formulário e são a forma mais segura de envio de dados sensíveis. Ele não aparece dados na url.

## Edição e remoção de usuário 

### Configurando Regex

Após criar as rotas agora irei começar a entender sobre com criar um regex dos parametros. Para começar um gerador dinamico das rotas, primeiramente vou definir que o parametro começara com ':'. Depois disso criei uma pasta para utils para construir o caminho da rota, e criei uma função onde filtra os caracteres aceitos atravéz de regex.

💡 Importante: o '^' é usado para dizer em regex que o parametro começa com determinado dado, neste caso é o pathWithParams.

🆔 Filtrando IDS: Para poder filtrar ids com regex e separa-los é usando o ?<$i> em conjunto com os critérios, neste regex utilizado fica assim: ```'(?<$i>[a-z0-9\-_]+)'```

## Remoção de registros

Criei um metodo no database de delete e coloquei os parametros de tabela e id, dentro dele fiz a busca pelo index desejado, buscando o index e verificando se é igual ao que foi requisitado.

## Atualização de registros

Corrigir não estar atualizando.