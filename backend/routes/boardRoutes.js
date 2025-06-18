// use express
const express = require("express");
// create a router
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// let kudosboards = [
//         {id: 1, title: "hello", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: []},
//         {id: 2, title: "exciting", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: []},
//         {id: 3, title: "wooo", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: []},
//         {id: 4, title: ":P", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: []}
//     ]

// get all boards from the database using routes
// since were interacting with a database, use async/await
router.get('/', async (req, res) => {
    const boards = await prisma.Board.findMany();
    console.log(boards);
    res.json(boards);
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.Board.findUnique({
        where: {id: boardId}
    })
    res.json(board);
    // // if pet exists, return into array
    // if (board) {
    //     res.json(board);
    // } else {
    //     res.status(404).send("Board not found")
    // }
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
    console.log(newBoard)
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
    console.log(deletedBoard);
    res.json(deletedBoard)
})

module.exports = router;