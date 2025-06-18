// use express
const express = require("express");
// create a router
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// get all cards for a given board
router.get('/:boardId/cards', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cards = await prisma.card.findMany({
        where: {boardId: boardId}, // returns all cards whos boardId is boardId
    })
    res.json(cards);
})

router.get('/:boardId/cards/:cardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const cardId = parseInt(req.params.cardId)
    const card = await prisma.Card.findUnique({
        where: {id: cardId,
            boardId: boardId
        }
    })
    res.json(card);
})

// create a card that is mapped to a board
router.post('/:boardId/cards/', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send("message is required")
    }
    const boardId = parseInt(req.params.boardId)
    const {message, gif, upvotes} = req.body;
    // create a new board object
    const newCard = await prisma.Card.create({
        data: {
            message,
            gif,
            upvotes,
            board: {connect: {id: boardId}}
        }
    })
    res.json(newCard)
})

// update a board element
router.put('/:boardId/cards/:cardId', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send("message is required")
    }
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const {message, gif, upvotes} = req.body;
    const updatedCard = await prisma.Card.update({
        where: {id: cardId},
        data: {
            message,
            gif,
            upvotes,
            board: {connect :{id: boardId}}
        }
    })
    res.json(updatedCard)
})

router.delete('/:boardId/cards/:cardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const deletedCard = await prisma.Card.delete({
        where: {boardId: boardId,
            id: cardId}
    })
    res.json(deletedCard);
})

module.exports = router;