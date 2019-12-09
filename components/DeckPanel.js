import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { purple, white } from '../utils/colors';

function DeckPanel (props) {
  const { questions } = props.display
  return (
    <View style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.heading}>{props.display.title}</Text>
      </View>
      <View style={styles.container}>
      <Text style={styles.cardCount}>{questions ? questions.length : 0} Cards</Text>
      </View>
    </View>

  )
}

function mapStateToProps (state, { deckId }) {
  const deck = state[deckId]
  return {
    display: deck
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: purple,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    paddingTop: 8,
    color: white,
    fontSize: 28,
  },
  cardCount: {
    color: white,
    fontSize: 20,
    paddingBottom: 15,
  }
})

export default connect(mapStateToProps)(DeckPanel)
