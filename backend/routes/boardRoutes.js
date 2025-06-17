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
    const kudosboards = await prisma.kudosboards.findMany()
    res.json(kudosboards)
})

// get board by id
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.kudosboards.findUnique({
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
    const {title, description, category, image, author, cards} = req.body;

    // create a new pet object
    const newBoard = {
        id: kudosboards.length+1,
        title,
        description,
        category,
        image,
        author,
        cards
    }

    // push new pet object onto pets array
    kudosboards.push(newBoard)
    // status 201 means successful creation and return new pet
    res.status(201).json(newBoard)
})

// update
router.put('/:boardId', (req, res) => {
    // const petId = parseInt(req.params.petId)
    const { boardId } = req.params
    const boardIndex = kudosboards.findIndex((board) => board.id === parseInt(boardId))

    if(boardIndex !== -1) {
        const updatedBoardInfo = req.body
        kudosboards[boardIndex] = {...kudosboards[boardIndex], ...updatedBoardInfo }
        res.json(kudosboards[boardIndex])
    } else {
        res.status(404).send('Board not found')
    }
})

router.delete('/:petId', (req, res) => {
    const { boardId } = req.params
    const initialLength = kudosboards.length
    kudosboards = kudosboards.filter(board => board.id !== parseInt(boardId))
    if(kudosboards.length < initialLength) {
        res.status(204).send("")
    } else {
        res.status(404).send('Board not found')
    }
})

module.exports = router;