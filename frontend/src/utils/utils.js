const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

const searchBoards = (boards, searchTerm) => {
    const searchedBoards = boards.filter((currBoard) => {
      return currBoard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return searchedBoards;
} 

export {categoryOptions, boardButtons, searchBoards }