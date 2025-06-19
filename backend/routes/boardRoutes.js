const express = require("express");
const router = express.Router();


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const cardRoutes = require('./cardRoutes')
router.use('/', cardRoutes)

const {checkBoardExists} = require('../utils/utils')


router.get('/', async (req, res) => {
    try {
        const boards = await prisma.Board.findMany({
            include: {cards: true}
        });
        res.json(boards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    try {
        const board = await checkBoardExists(boardId)

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
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.status(400).send("title, description, and category are required")
    }
    const {title, description, category, image, author} = req.body;

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
    if (!req.body.title || !req.body.description || !req.body.category) {
        return res.status(400).send("title, description, and category are required")
    }
    const boardId = parseInt(req.params.boardId)
    const {title, description, category, image, author} = req.body;
    try {    
        const boardExists = await checkBoardExists(boardId)

        if (!boardExists) {
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
        const boardExists = await checkBoardExists(boardId);

        if (!boardExists) {
            return res.status(404).send("Board not found")
        }

        // delete cards associated with board
        const deletedCards = await prisma.card.deleteMany({
            where: {boardId: boardId}
        })
        const deletedBoard = await prisma.board.delete({
            where: {id: boardId}
        })
        res.json(deletedBoard);
    } catch (error) {
        res.status(500).send("An error occurred while deleting the board")
    }
})

module.exports = router;