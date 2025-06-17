const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

// const searchButtons = [{id: "search-btn", type: "submit", text: "Search"}, {id: "clear-btn", type: "reset", text: "Clear"}]
// const cardButtons = [{id: "upvote-btn", text: {`Upvote: ${upvotes}`}}, {id: "delete-btn", text: "Delete"}]

const searchBoards = (boards, searchTerm) => {
    const searchedBoards = boards.filter((currBoard) => {
      return currBoard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return searchedBoards;
} 

export {categoryOptions, boardButtons, searchBoards }