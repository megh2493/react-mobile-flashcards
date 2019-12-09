import { AsyncStorage } from 'react-native'
import { formatDeckResults, DECKS_KEY } from './helpers'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(formatDeckResults)
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [deck.title]: {
      title: deck.title,
      questions: deck.questions
    }
  }))
}

export function saveCard (deckKey, card) {
  AsyncStorage.getItem(DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[deckKey]
      const newList = deck.questions.concat(card)
      data[deckKey] = {
        title: deckKey,
        questions: newList
      }
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}
