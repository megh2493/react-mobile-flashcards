import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList'
import DeckItem from './components/DeckItem'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import QuizView from './components/QuizView';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='th-list' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};
const TabNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: 50 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: DeckItem,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },

  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: "Add Card",
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
  StartQuiz: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: "Quiz",
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
}));

export default function App () {

  return (
    <Provider store={createStore(reducer, {})}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
