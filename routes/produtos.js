const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool


//retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error:error })}
        conn.query('SELECT * FROM produtos', 
        (error, result, field) => {
            if(error){return res.status(500).send({ error:error })}
            const response = {
              quantidade: result.length,
              produtos: result.map(prod => {
                return {
                  id_produto: prod.id_produto,
                  nome: prod.nome,
                  preco: prod.preco,
                  request: {
                    tipo: 'GET',
                    descricao:'Recupera todos os produtos',
                    url: 'http://localhost:3000/produtos/' + prod.id_produto
                  }
                }
              })
            }
            return res.status(200).send({response})
        })
    })
})

//insere um produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release()
                const response = {
                  mensagem: 'Produto inserido com sucesso!',
                  produtoCriado: {
                    id_produto: result.id_produto,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                      tipo: 'POST',
                      descricao: 'Insere um produto',
                      url: 'http://localhost:3000/produtos',
                    }
                  }
                }
                return res.status(201).send(response)
            }
        )
    })

})

//retorna determinado produto
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error:error })}
        conn.query('SELECT * FROM produtos WHERE id_produto = ?',
        [req.params.id_produto], 
        (error, result, field) => {
            if(error){return res.status(500).send({ error:error })}
            if(result.length == 0){
              return res.status(404).send({
                mensagem: 'Não foi encontrado produto com este id'
              })
            }
            const response = {
              produto: {
                id_produto: result[0].id_produto,
                nome: result[0].nome,
                preco: result[0].preco,
                request: {
                  tipo: 'GET',
                  descricao: 'Recupera produto de determinado id',
                  url: 'http://localhost:3000/produtos',
                }
              }
            }
            return res.status(200).send({produtos:result})
        })
    })
})

//retorna patch
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, result, field) => {
                conn.release()
                res.status(202).send({
                    mensagem: 'Produto editado com sucesso',
                })
            }
        )
    })
})

//deleta determinado produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, result, field) => {
                conn.release()
                res.status(202).send({
                    mensagem: 'Produto deletado com sucesso',
                })
            }
        )
    })
})
module.exports = router;