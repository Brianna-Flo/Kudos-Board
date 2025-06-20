const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkCommentInCard = async(commentId, cardId) => {
    const comment = await prisma.comment.findUnique({
        where: {id: commentId,
            cardId: cardId
        }
    })
    return comment;
}

const checkCardInBoard = async(cardId, boardId) => {
    const card = await prisma.Card.findUnique({
        include: {comments: true},
        where: {id: cardId,
            boardId: boardId
        }
    })
    return card;
}

const checkBoardExists = async(boardId) => {
    const board = await prisma.Board.findUnique({
            where: {id: boardId},
            include: {cards: {include: {comments: true},
                                        orderBy: {pinned: 'desc'}}},
    })
    return board;
}

module.exports = {checkCardInBoard, checkBoardExists, checkCommentInCard}