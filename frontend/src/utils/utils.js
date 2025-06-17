const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const searchBoards = (boards, searchTerm) => {
    const searchedBoards = boards.filter((currBoard) => {
      return currBoard.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    return searchedBoards;
} 

export {categoryOptions, searchBoards }