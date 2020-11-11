const express = require('express')
const router = express.Router()

//retorna todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error:error })}
        conn.query('SELECT * FROM pedidos', 
        (error, result, field) => {
            if(error){return res.status(500).send({ error:error })}
            return res.status(200).send({pedidos:result})
        })
    })
})

//insere um pedido
router.post('/', (req, res, next) => {
        //criando objeto literal pedido
        const pedido = {
            id_produto: req.body.id_produto,
            quantidade: req.body.quantidade
        }
    res.status(201).send({
        mensagem: 'POST na rota de pedidos',
        pedido_criado: pedido
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