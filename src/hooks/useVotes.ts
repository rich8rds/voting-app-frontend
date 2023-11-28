import { useContext } from "react"
import { VotesContext } from "../context/votesContext"

export const useVotes = () => useContext(VotesContext)