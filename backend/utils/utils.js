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

module.exports = {checkCardInBoard}