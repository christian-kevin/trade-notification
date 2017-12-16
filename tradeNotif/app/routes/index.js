import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { cloneDeep, forEach } from 'lodash';
import { Qicon, BackButton } from '../component';
import { SCREEN_WIDTH } from '../core/constant';
import {
  Home,
  Cart,
  Account,
  Search,
  SearchResult,
  BrowseExp,
  BrowseResult,
  GiftFinder,
  HotItems,
  ProductDetail,
  ShopNavigator,
  // GuestTrackTransaction,
  TransactionList,
  Invoice,
  InvoiceDetail,
  OrderTracking,
  Review,
  EditReview,
  AccountInformation,
  FavoriteProduct,
  Register,
  Login,
  ShippingAddress,
  Payment,
  PaymentBankTransfer,
  PaymentCreditCard,
  PaymentIndomaret,
  PaymentFinished,
  PaymentFinishedIndomaret,
  EditorPicks,
  WebViewer,
  ForgotPassword,
  Promo,
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
  Home: { screen: Home },
  Search: { screen: Search },
  SearchResult: {
    screen: SearchResult,
    path: 's/:searchQuery',
  },
  Browse: { screen: BrowseExp },
  BrowseResult: {
    screen: BrowseResult,
    path: 'b/:categories',
  },
  GiftFinder: { screen: GiftFinder },
  HotItems: {
    screen: HotItems,
    path: 'hot-items',
  },
  EditorPicks: {
    screen: EditorPicks,
    path: 'editor-pick/:slug',
  },
  ProductDetail: {
    screen: ProductDetail,
    path: 'item/:itemName/:shopUrl/:itemId',
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  Shop: {
    // Deep linking currenly doesn't work for Shop page due to nested navigators bug(s).
    // Also, shopUrl pattern matching might cause problems due to its lack of prefix.
    screen: ShopNavigator,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  HomeWeb: {
    screen: WebViewer,
  },
  LoginHome: {
    screen: Login,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  RegisterHome: {
    screen: Register,
    navigatiRnOptions: stackNavigatorConfig.navigationOptions,
  },
  Promo: {
    screen: Promo,
  },
});

const FavoriteNavigator = StackNavigator({
  Favorite: {
    screen: FavoriteProduct,
    path: 'account/favorite',
  },
  ProductDetailFavorite: {
    screen: ProductDetail,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  FavoriteWeb: {
    screen: WebViewer,
  },
});

const CartNavigator = StackNavigator({
  Cart: {
    screen: Cart,
    path: 'cart',
  },
  ProductCart: {
    screen: ProductDetail,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  AddShippingAddress: { screen: ShippingAddress },
  Payment: { screen: Payment },
  PaymentBankTransfer: { screen: PaymentBankTransfer },
  PaymentCreditCard: { screen: PaymentCreditCard },
  PaymentIndomaret: { screen: PaymentIndomaret },
  PaymentFinished: { screen: PaymentFinished },
  PaymentFinishedIndomaret: { screen: PaymentFinishedIndomaret },
  InvoiceDetailCart: {
    screen: InvoiceDetail,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  CartWeb: { screen: WebViewer },
  LoginCart: {
    screen: Login,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  RegisterCart: {
    screen: Register,
    navigatiRnOptions: stackNavigatorConfig.navigationOptions,
  },
});

const AccountNavigator = StackNavigator({
  Account: { screen: Account },
  // GuestTrackTransaction: {
  //   screen: GuestTrackTransaction,
  //   navigationOptions: stackNavigatorConfig.navigationOptions,
  // },
  TransactionList: {
    screen: TransactionList,
    path: 'account/purchase',
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  Invoice: {
    screen: Invoice,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  InvoiceDetail: {
    screen: InvoiceDetail,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  OrderTracking: {
    screen: OrderTracking,
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  Review: {
    screen: Review,
    path: 'account/review',
  },
  EditReview: { screen: EditReview },
  AccountInformation: {
    screen: AccountInformation,
    path: 'account/info',
  },
  AccountShippingAddress: {
    screen: ShippingAddress,
    path: 'account/address',
  },
  Register: {
    screen: Register,
    path: 'user/register',
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  Login: {
    screen: Login,
    path: 'user/login',
    navigationOptions: stackNavigatorConfig.navigationOptions,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
  InfoWeb: {
    screen: WebViewer,
  },
  ProductDetailAccount: {
    screen: ProductDetail,
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
    Favorite: {
      screen: FavoriteNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'FAVORIT',
        tabBarIcon: ({ tintColor }) => (
          <Qicon name="love" style={[styles.tabBarIcon, { color: tintColor }]} />
        ),
        tabBarOnPress: (scene, jumpToIndex) =>
          tabNavigatorConfig.tabBarOnPress(scene, jumpToIndex, navigation),
      }),
    },
    Cart: {
      screen: CartNavigator,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: 'KERANJANG',
        tabBarIcon: ({ tintColor }) => (
          <Qicon name="cart" style={[styles.tabBarIcon, { color: tintColor }]} />
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

let canNavigate = true;

/** this function is to force rerender Product Detail page after opening other Product page
 *  on another tab (can future modified to handle other page if page have component refresh
 *  supplied in params)
 * @param newActiveTabIndex
 * @param action
 * @param state
 */
const forceRender = (newActiveTabIndex, action, state) => {
  if (newActiveTabIndex >= 0) {
    const activePageNewTab = state.routes[newActiveTabIndex]
            .routes[state.routes[newActiveTabIndex].routes.length - 1];
    if (state.routes[state.index].routeName !== action.routeName &&
            (activePageNewTab.routeName === 'ProductDetail' ||
                activePageNewTab.routeName === 'ProductCart' ||
                activePageNewTab.routeName === 'ProductDetailFavorite' ||
                activePageNewTab.routeName === 'ProductDetailAccount')) {
      activePageNewTab.params.onLoadOnDeepLinking();
    }
  }
};

/** this function is to add logic on root Navigator before firing navigation action
 * @param navigator
 */
const overrideRootNavigate = navigator => (action, state) => {
  const { type } = action;
  if (state) {
    let newActiveTabIndex;
    if (type === NavigationActions.BACK) {
      if (state.routes[state.index].index === 0) {
        newActiveTabIndex = 0;
      }
      forceRender(newActiveTabIndex, action, state);
    }
    if (type === NavigationActions.NAVIGATE) {
          // this function is to prevent double click
      if (canNavigate) {
        canNavigate = false;
        setTimeout(() => {
          canNavigate = true;
        }, 600);

        newActiveTabIndex = state.routes.findIndex(route =>
              route.routeName === action.routeName);
        forceRender(newActiveTabIndex, action, state);

        /** check if new productDetail stacked on top of another productDetail and
         * new productDetail doesn't have onLoadPreviousPage
         * (ex: first time navigate from item deep linking)
         */
        const lastScreen = state.routes[state.index].routes[state.routes[state.index].index];
        if (state.index === 0 &&
                  state.routes[state.index].index !== 0 &&
                  lastScreen.routeName === 'ProductDetail' &&
                  action.routeName === 'ProductDetail' &&
                  typeof action.params.onLoadPreviousPage === 'undefined') {
          const newAction = cloneDeep(action);
          newAction.params.onLoadPreviousPage = lastScreen.params.onLoadOnDeepLinking;
          return navigator(newAction, state);
        }

        /** check homeStack when navigating to Shop, if shop screen exists in current stack then
         * add params isOnScreen=false to the current shop stack
         */
        if (state.index === 0 &&
                  action.routeName === 'Shop') {
          const newState = cloneDeep(state);
          forEach(newState.routes[0].routes, (route) => {
            if (route.routeName === 'Shop') {
              route.routes[route.index].params = Object.assign(route.routes[route.index].params,
                {
                  isOnScreen: false,
                  isShowTab: false,
                });
            }
          });
          return navigator(action, newState);
        }

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
