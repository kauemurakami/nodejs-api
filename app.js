const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const routeProdutos = require('./routes/produtos')
const routePedidos = require('./routes/pedidos')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false})) // apenas aceitar dados simples
app.use(bodyParser.json()) // apenas aceitar json de entrada

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    //no caso do seu servidor ex http://minhapi.com... < > * api seria acessivel apenas desse servidor
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT','PATCH', 'DELETE', 'POST', 'GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/produtos', routeProdutos)
app.use('/pedidos', routePedidos)

//quando nao encontra nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({erro: {mensagem:error.message}})
})

module.exports = app