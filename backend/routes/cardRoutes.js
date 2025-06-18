// use express
const express = require("express");
// create a router
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// get all cards for a given board
router.get('/', async (req, res) => {
    // const boardId = parseInt(req.params.id)
    // const cards = await prisma.board.findUnique({
    //     where: {id: boardId}, // given the id from the parameters from the url, find the board
    // })
    const cards = await prisma.Card.findMany();
    res.json(cards);
})

router.get('/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId)
    const card = await prisma.Card.findUnique({
        where: {id: cardId}
    })
    res.json(card);
})

// create a card that is mapped to a board
router.post('/', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send("message is required")
    }
    const {message, gif, upvotes, boardId} = req.body;

    // create a new board object
    const newCard = await prisma.Card.create({
        data: {
            message,
            gif,
            upvotes,
            boardId
        }
    })
    res.json(newCard)
})

// update a board element
router.put('/:cardId', async (req, res) => {
    if (!req.body.message) {
        return res.status(400).send("message is required")
    }
    const cardId = parseInt(req.params.cardId)
    const {message, gif, upvotes, boardId} = req.body;
    const updatedCard = await prisma.Card.update({
        where: {id: cardId},
        data: {
            message,
            gif,
            upvotes,
            boardId
        }
    })
    res.json(updatedCard)
})

router.delete('/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId)
    const deletedCard = await prisma.Card.delete({
        where: {id: cardId}
    })
    res.json(deletedCard);
})

module.exports = router;

module.exports = router;