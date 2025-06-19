import {createContext, useContext} from 'react'
export const BoardContext = createContext();
export const useBoardContext = () => useContext(BoardContext)
