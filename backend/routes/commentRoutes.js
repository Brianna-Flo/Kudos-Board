const express = require("express");
const router = express.Router();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const {checkCommentInCard} = require('../utils/utils')


// get all comments for a given card
router.get('/:cardId/comments', async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    try {
        const comments = await prisma.comment.findMany({
            where: {cardId: cardId}, // returns all comments whos cardId is cardId
        })
        res.json(comments);
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

router.get('/:cardId/comments/:commentId', async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const commentId = parseInt(req.params.commentId);
    try {
        const comment = await checkCommentInCard(commentId, cardId)
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send(`Comment ${commentId} not found in card ${cardId}`)
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

// create a new comment for the given card
// create a card that is mapped to a board
router.post('/:cardId/comments/', async (req, res) => {
    if (!req.body.commentMessage) {
        return res.status(400).send("A message is required")
    }
    const cardId = parseInt(req.params.cardId)
    const {commentMessage, commentAuthor} = req.body;

    try {
        const newComment = await prisma.Comment.create({
            data: {
                commentMessage,
                commentAuthor,
                card: {connect: {id: cardId}}
            }
        })
        res.json(newComment)
    } catch (error) {
        res.status(500).send('An error occurred while posting the comment')
    }  
})

// update the comment
router.put('/:cardId/comments/:commentId', async (req, res) => {
    if (!req.body.commentMessage) {
        return res.status(400).send("A message is required")
    }
    const cardId = parseInt(req.params.cardId)
    const commentId = parseInt(req.params.commentId)
    const {commentMessage, commentAuthor} = req.body;

    try {
        const inCard = await checkCommentInCard(commentId, cardId);
        if (!inCard) {
            return res.status(404).send(`Comment ${commentId} not found in card ${cardId}`)
        }

        const updatedComment = await prisma.comment.update({
           where: {id: commentId},
            data: {
                commentMessage,
                commentAuthor,
                card: {connect: {id: cardId}}
            }
        })
        res.json(updatedComment)
    } catch (error) {
        res.status(500).send("An error occurred while updating the comment")
    }
    
})

// delete a comment
router.delete('/:cardId/comments/:commentId', async (req, res) => {
    const cardId = parseInt(req.params.cardId)
    const commentId = parseInt(req.params.commentId)
    try {
        const inCard = await checkCommentInCard(commentId, cardId);
        if (!inCard) {
            return res.status(404).send(`Comment ${commentId} not found in card ${cardId}`)
        }

        const deletedComment = await prisma.Comment.delete({
            where: {cardId: cardId,
                id: commentId}
        })
        res.json(deletedComment);
    } catch (error) {
        res.status(500).send("An error occurred while deleting the comment")
    }
    
})

module.exports = router;