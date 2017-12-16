import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { Qicon, BackButton } from '../component';
import { SCREEN_WIDTH } from '../core/constant';
import {
  Login,
  Home,
} from '../screen';

// TODO: configure deep linking for iOS

const styles = StyleSheet.create({
  tabBarIcon: {
    fontSize: 18,
  },
});

const stackNavigatorConfig = {
  navigationOptions: ({ navigation }) => ({
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerTitleStyle: {
      fontFamily: 'VarelaRound-Regular',
      fontWeight: '200',
      fontSize: 14,
      color: '#666',
      width: SCREEN_WIDTH,
      marginLeft: -50,
      textAlign: 'center',
    },
  }),
};

const tabNavigatorConfig = {
  tabBarOnPress: (scene, jumpToIndex, navigation) => {
    if (scene.focused) {
      if (scene.route.index !== 0) {
        navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: scene.route.routes[0].routeName })],
          }),
        );
      }
    } else {
      jumpToIndex(scene.index);
    }
  },
};

/**
 * !!! IMPORTANT NOTE !!!
 * When changing path of a screen, double check that it matches with AndroidManifest.xml!
 */
const HomeNavigator = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: stackNavigatorConfig.navigationOptions,
    },
});

const AccountNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
});

const MainScreenNavigator = TabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'BERANDA',
        tabBarIcon: ({ tintColor }) => (
          <Qicon name="home" style={[styles.tabBarIcon, { color: tintColor }]} />
        ),
        tabBarOnPress: (scene, jumpToIndex) =>
          tabNavigatorConfig.tabBarOnPress(scene, jumpToIndex, navigation),
      }),
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'AKUN',
        tabBarIcon: ({ tintColor }) => (
          <Qicon name="user" style={[styles.tabBarIcon, { color: tintColor }]} />
        ),
        tabBarOnPress: (scene, jumpToIndex) =>
          tabNavigatorConfig.tabBarOnPress(scene, jumpToIndex, navigation),
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#00b4ac',
      inactiveTintColor: '#666',
      labelStyle: {
        fontFamily: 'VarelaRound-Regular',
      },
      style: {
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        paddingTop: 10,
        paddingBottom: 10,
        elevation: 15,
      },
    },
  },
);

/** this function is to add logic on root Navigator before firing navigation action
 * @param navigator
 */
const overrideRootNavigate = navigator => (action, state) => {
  const { type } = action;
  if (state) {
    if (type === NavigationActions.NAVIGATE) {
          // this function is to prevent double click
      if (canNavigate) {
        canNavigate = false;
        setTimeout(() => {
          canNavigate = true;
        }, 600);

        return navigator(action, state);
      }
          // you might want to replace 'null' with 'state' if you're using redux
      return null;
    }
  }
  return navigator(action, state);
};

MainScreenNavigator.router.getStateForAction = overrideRootNavigate(
    MainScreenNavigator.router.getStateForAction,
);

export default MainScreenNavigator;
