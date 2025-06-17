const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

const searchButtons = [{id: "search-btn", type: "submit", text: "Search"}, {id: "clear-btn", type: "reset", text: "Clear"}]
// const cardButtons = [{id: "upvote-btn", text: {`Upvote: ${upvotes}`}}, {id: "delete-btn", text: "Delete"}]

const findBoardsBySearchTerm = (boards, searchTerm) => {
    const searchedBoards = boards.filter((currBoard) => {
      return currBoard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return searchedBoards;
} 

const filterBoardsByCategory = (boards, requestedCategory) => {
    // console.log("in filter boards, boards: ", boards);
    // if category is all, return all boards
    if (!boards) {
        return [];
    }
    if (requestedCategory === categoryOptions[0]) { // category is all
        return boards;
    }
    // console.log("board category", boards[0].category, "filter by: ", reqCategory)
    const filteredBoards = boards.filter((currBoard) => {
        return currBoard.category === requestedCategory;
    })
    return filteredBoards;
}

export {categoryOptions, boardButtons, searchButtons, findBoardsBySearchTerm, filterBoardsByCategory }