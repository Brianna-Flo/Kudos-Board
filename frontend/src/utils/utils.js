const categoryOptions = ["All", "Recent", "Celebration", "Thank You", "Inspiration"]
const filterEndpoints = ["/", "/recent",  "/celebration", "/thank-you", "/inspiration"]

const boardButtons = [{id: "view-btn", text: "View Board"}, {id: "delete-btn", text: "Delete Board"}]

const searchButtons = [{id: "search-btn", type: "submit", text: "Search"}, {id: "clear-btn", type: "reset", text: "Clear"}]
const baseUrl = import.meta.env.VITE_API_URL;

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

const fetchSearchedBoards = async (searchTerm) => {
    try {
        const response = await fetch(`${baseUrl}/boards/search?query=${searchTerm}`);
        if (!response.ok) {
            throw new Error("Failed to fetch searched board data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const filterHelper = async (filter) => {
    const response = await fetch(`${baseUrl}/boards${filter}`);
    if (!response.ok) {
        throw new Error("Failed to fetch filtered boards");
    }
    const data = await response.json();
    return data;
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

const upvoteHelper = async (cardInfo) => {
    const response = await fetch(`${baseUrl}/boards/${cardInfo.boardId}/cards/${cardInfo.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...cardInfo, 
                                cardUpvotes: (++cardInfo.cardUpvotes),})
    })
    if (!response.ok) {
        throw new Error("Failed to upvote card");
    }
    const data = await response.json();
    return data;
}

export {categoryOptions, filterEndpoints, boardButtons, searchButtons, fetchHelper, deleteHelper, newHelper, fetchSingleBoard, upvoteHelper, filterHelper, fetchSearchedBoards}