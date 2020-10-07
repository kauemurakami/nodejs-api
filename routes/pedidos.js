const express = require('express')
const router = express.Router()

//retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem:'Retorna todos os pedidos'
    })
})

//insere um pedido
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'POST na rota de pedidos'
    })
})

//retorna determinado produto
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem: 'Rertono pedido com parametro id GET',
        id: id
    })
})

//deleta determinado pedido
router.delete('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem: 'Deletando pedido DELETE',
        id: id
    })
})
module.exports = router;