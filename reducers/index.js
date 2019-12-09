import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function decks (state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK: {
      const { deck } = action.deck
      return {
        ...state,
        [deck.title]: deck,
      }
    }
    case ADD_CARD: {
      const { question, answer, deckKey } = action.card
      return {
        ...state,
        [deckKey]: {
          ...state[deckKey],
          questions: state[deckKey].questions.concat({
            question,
            answer
          })
        }
      }
    }
    default:
      return state
  }
}