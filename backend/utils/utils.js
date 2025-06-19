const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkCardInBoard = async(cardId, boardId) => {
    const card = await prisma.Card.findUnique({
        where: {id: cardId,
            boardId: boardId
        }
    })
    return card;
}

const checkBoardExists = async(boardId) => {
    const board = await prisma.Board.findUnique({
            where: {id: boardId},
            include: {cards: true}
    })
    return board;
}

module.exports = {checkCardInBoard, checkBoardExists}