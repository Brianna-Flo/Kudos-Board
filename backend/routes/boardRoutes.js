// use express
const express = require("express");
// create a router
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// cards are associated with a board, so use cards for each board
const cardRoutes = require('./cardRoutes')
// router.use(express.json());
// // app will display pets only if localhost:3000/pets which will be the root directory
router.use('/', cardRoutes)


// get all boards from the database using routes
// since were interacting with a database, use async/await
router.get('/', async (req, res) => {
    const boards = await prisma.Board.findMany({include: {cards: true}});
    // shows the relation (cards array)
    res.json(boards);
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.Board.findUnique({
        where: {id: boardId},
        include: {cards: true}
    })
    res.json(board);
})

// post request, listens for create requests
router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.image) {
        return res.status(400).send("title, description, category, and image are required")
    }
    const {title, description, category, image, author, cards} = req.body;

    // create a new board object
    const newBoard = await prisma.board.create({
        data: {
            title,
            description,
            category,
            image,
            author,
        }
    })
    res.json(newBoard)
})

// update a board element
router.put('/:boardId', async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.image) {
        return res.status(400).send("title, description, category, and image are required")
    }
    const boardId = parseInt(req.params.boardId)
    const {title, description, category, image, author, cards} = req.body;
    const updatedBoard = await prisma.board.update({
        where: {id: boardId},
        data: {
            title,
            description,
            category,
            image,
            author
        }
    })
    res.json(updatedBoard)
})

router.delete('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const deletedBoard = await prisma.board.delete({
        where: {id: boardId}
    })
    res.json(deletedBoard);
})

module.exports = router;