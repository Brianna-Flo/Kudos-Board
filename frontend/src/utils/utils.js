const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

const searchButtons = [{id: "search-btn", type: "submit", text: "Search"}, {id: "clear-btn", type: "reset", text: "Clear"}]
// const cardButtons = [{id: "upvote-btn", text: {`Upvote: ${upvotes}`}}, {id: "delete-btn", text: "Delete"}]

// const sampleBoards = [{title: "hello", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: [{id: 1, cardTitle: "testing", cardDescription: "another test", gifURL: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRwbjVjOXplMDU0bG52N2p4OXM3ZjR6b2w2aGUwY293eGpwanpzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hq1MkVwdESwSPG2yMa/giphy.gif", cardAuthor: "", cardUpvotes: 1}, {id: 2, cardTitle: "wahoo", cardDescription: "another card", gifURL: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzhxajlrem5yNDhjNGJiaXVybGEyMDkybTkxeDN3NTlxOXRqdHR2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10xUg8DdgQSs9i/giphy.gif", cardAuthor: "", cardUpvotes: 4}]},
//                     {title: "exciting", description: "descriptionsss", category: "Celebration", image: "jazz.jpg", author: "", cards: []},
//                     {title: "wooo", description: "descriptionsss", category: "Inspiration", image: "jazz.jpg", author: "", cards: []},
//                     {title: ":P", description: "descriptionsss", category: "Thank You", image: "jazz.jpg", author: "", cards: []}]


const findBoardsBySearchTerm = (boards, searchTerm) => {
    const searchedBoards = boards.filter((currBoard) => {
      return currBoard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return searchedBoards;
} 

const filterBoardsByCategory = (boards, requestedCategory) => {
    // if category is all, return all boards
    if (!boards) {
        return [];
    }
    if (requestedCategory === categoryOptions[0]) { // category is all
        return boards;
    }
    const filteredBoards = boards.filter((currBoard) => {
        return currBoard.category === requestedCategory;
    })
    return filteredBoards;
}

export {categoryOptions, boardButtons, searchButtons, findBoardsBySearchTerm, filterBoardsByCategory }