const express = require('express')
const router = express.Router()

//retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem:'Retorna todos produtos'
    })
})

//insere um produto
router.post('/', (req, res, next) => {

    //criando objeto literal produto
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
    }
    res.status(201).send({
        mensagem: 'POST na rota de produtos',
        produtoCriado: produto
    })
})

//retorna determinado produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    res.status(200).send({
        mensagem: 'Rertono produto com parametro id GET',
        id: id
    })
})

//retorna patch
router.patch('/', (req, res, next) => {
    const id = req.params.id_produto
    res.status(200).send({
        mensagem: 'Rertono produto PATCH ',
        id: id
    })
})

//deleta determinado produto
router.delete('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    res.status(200).send({
        mensagem: 'Deletando produto DELETE',
        id: id
    })
})
module.exports = router;