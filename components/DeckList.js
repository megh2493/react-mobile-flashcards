import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Animated } from 'react-native';
import DeckPanel from './DeckPanel'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class DeckList extends Component {

  state = {
    bounceValue: new Animated.Value(1),
  }

  componentDidMount () {
    const { dispatch } = this.props
    console.log("in comp did mount")
    console.log(getDecks())
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  goToDeck = (title) => {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
    this.props.navigation.navigate(
      'Deck',
      { deckId: title }
    )
  }

  render () {
    const { items } = this.props
    const { bounceValue } = this.state
    return (
      <SafeAreaView style={styles.container}>
        {items.length === 0 && (
          <View style={styles.container}>
        <Text style={styles.noDecks}>You have no decks</Text>
        </View>)}
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Animated.View style={{transform: [{scale: bounceValue}]}}>
            <TouchableOpacity onPress={() => this.goToDeck(item.title)}
            key={item.title}>
            <DeckPanel deckId={item.title} />
          </TouchableOpacity>
          </Animated.View>
          )}
          keyExtractor={item => item.title}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  heading: {
    color: purple,
    fontSize: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDecks: {
    color: purple,
    fontSize: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 60,
    marginRight: 40
  }
})

function mapStateToProps (state) {
  const items = Object.values(state)
  return {
    items
  }
}
export default connect(mapStateToProps)(DeckList)
