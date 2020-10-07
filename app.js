const express = require('express')
const app = express()
const morgan = require('morgan')
const routeProdutos = require('./routes/produtos')
const routePedidos = require('./routes/pedidos')

app.use(morgan('dev'))

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