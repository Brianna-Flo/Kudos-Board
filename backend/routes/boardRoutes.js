const express = require("express");
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cardRoutes = require('./cardRoutes')
router.use('/', cardRoutes)


router.get('/', async (req, res) => {
    try {
        const boards = await prisma.Board.findMany();
        res.json(boards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    try {
        const board = await prisma.Board.findUnique({
            where: {id: boardId},
            include: {cards: true}
        })

        if (board) {
            res.json(board);
        } else {
            res.status(404).send("Board not found")
        }
        
    } catch (error) {
        res.status(500).send('An error occurred while fetching the board')
    }
})

// create a new board
router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.image) {
        return res.status(400).send("title, description, category, and image are required")
    }
    const {title, description, category, image, author, cards} = req.body;

    // create a new board object
    try {
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
    } catch (error) {
        res.status(500).send('An error occurred while creating the board')
    }
})

// update a board element
router.put('/:boardId', async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.category || !req.body.image) {
        return res.status(400).send("title, description, category, and image are required")
    }
    const boardId = parseInt(req.params.boardId)
    const {title, description, category, image, author} = req.body;
    try {    
        const checkBoardExists = await prisma.Board.findUnique({
            where: {id: boardId},
        })

        if (!checkBoardExists) {
            return res.status(404).send("Board not found")
        }

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
    } catch (error) {
        res.status(500).send("An error occurred while updating the board")
    }
})

router.delete('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    try {
        const checkBoardExists = await prisma.Board.findUnique({
            where: {id: boardId},
        })

        if (!checkBoardExists) {
            return res.status(404).send("Board not found")
        }

        const deletedBoard = await prisma.board.delete({
            where: {id: boardId}
        })
        res.json(deletedBoard);
    } catch (error) {
        res.status(500).send("An error occurred while deleting the board")
    }
})

module.exports = router;