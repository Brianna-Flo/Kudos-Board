const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

const searchButtons = [{id: "search-btn", type: "submit", text: "Search"}, {id: "clear-btn", type: "reset", text: "Clear"}]
// const cardButtons = [{id: "upvote-btn", text: {`Upvote: ${upvotes}`}}, {id: "delete-btn", text: "Delete"}]
const baseUrl = import.meta.env.VITE_API_URL;


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

const fetchHelper = async () => {
    try {
      const response = await fetch(`${baseUrl}/boards`);
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  const deleteHelper = async (boardId) => {
    const response = await fetch(`${baseUrl}/boards/${boardId}`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new Error("Failed to delete board")
    }
    const data = await response.json();
    return data;
}

const newHelper = async (newBoard) => {
    const response = await fetch(`${baseUrl}/boards/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBoard)
    })
    if (!response.ok) {
        throw new Error("Failed to create board");
    }
    const data = await response.json();
    return data;
}

const fetchSingleBoard = async (boardId) => {
    try {
        const response = await fetch(`${baseUrl}/boards/${boardId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch board data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

export {categoryOptions, boardButtons, searchButtons, findBoardsBySearchTerm, filterBoardsByCategory, fetchHelper, deleteHelper, newHelper, fetchSingleBoard}