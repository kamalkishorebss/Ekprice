import React from 'react';
import { View, Text,Dimensions,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator,DrawerItems,DrawerActions } from 'react-navigation-drawer';
import Login from './src/screens/auth/login';
import Register from './src/screens/auth/register';
import RestorePassword from './src/screens/auth/resetPassword';
import Splash from './src/screens/splash/splash';
import Home from './src/screens/home/index';
import Categories from './src/screens/categories/index';
import SubCategories from './src/screens/subcategories/index';
import Category   from './src/screens/category/index';
import Filter  from './src/screens/filter/index';
import Orders from './src/screens/userOrder/index';
import UserOrderReview from './src/screens/order/user_order';
import OrderSuccess from './src/screens/order/order_success';
import OrderDetail from './src/screens/order_detail/index';
import WriteReviews from './src/screens/reviews/index';
import MyService from './src/screens/my_services/index';
import SellerAccount from './src/screens/my_account/index';
import Account from './src/screens/my_account/useraccount';
import Notification from './src/screens/notification/index';
import ServiceDetail from './src/screens/service_detail/index';
import Message  from './src/screens/message/index'; 
import Step1 from './src/screens/add_service/step1';
import Step2 from './src/screens/add_service/step2';
import Edit_Services_Step1 from './src/screens/edit_services/step1';
import Edit_Services_Step2 from './src/screens/edit_services/step2';
import Language from './src/screens/language/index';
import Country from './src/screens/country/index'
import Earnings  from './src/screens/earnings/index';
import BankDetail from './src/screens/earnings/bankDetail';
import About from  './src/screens/about/index';
import Policy from './src/screens/policy/index';
import Terms from './src/screens/T&C/index';
import AddSeller1 from './src/screens/add_seller/index1';
import AddSeller2 from './src/screens/add_seller/index2';
import EditSeller1 from './src/screens/edit_seller/index1';
import EditSeller2 from './src/screens/edit_seller/index2';
import Loader from './src/screens/loader/loader';
import SearchPage from './src/screens/search/index';
import ApprovalPage from './src/screens/approval/index';
import VideoPlay from './src/screens/videoPlayer/index';
//import ChatScreen from './src/screens/chatscreen';
import ChatScreen from './src/screens/chatscreen';
import MessageIcon from './MessageIcon';

const { width } = Dimensions.get('window')
const initialRoute = {
  Splash   :     {screen : Splash}
}
const AuthStack = {
  
   Login    : {screen:  Login},
   Register : {screen : Register},
   RestorePassword : {screen : RestorePassword}
}
const addService = {
  Step1   :     {screen : Step1},
  Step2   :     {screen : Step2}
} 

const editService = {
  Edit_Services_Step1 : {screen : Edit_Services_Step1},
  Edit_Services_Step2 : {screen : Edit_Services_Step2}
}
const TabNavigator = createBottomTabNavigator({
  
  Home         :   {screen : Home},
  Message      :   {screen : Message},
  Orders       :   {screen : Orders},
  Account      :   {screen : Account},
  Notification :   {screen : Notification},
  
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        return (
          <Image
            source={
              focused
                ? require('./src/assets/img/redhome.png')
                : require('./src/assets/img/home.png')
            }
            style={{
              width: 25,
              height: 25,
              borderRadius: 40 / 2,
            }}
          />
        );
      } else if (routeName === 'Message') {
        return (
          <Image
            source={
              focused
                 ? require('./src/assets/img/redchat.png')
                : require('./src/assets/img/chat.png')
            }
            style={{
              width: 25,
              height: 25,
              borderRadius: 40 / 2,
            }}
          />
        );
      }
      else if (routeName === 'Orders') {
        return (
          <Image
            source={
              focused
                 ? require('./src/assets/img/rednotice.png')
                : require('./src/assets/img/notice.png')
            }
            style={{
              width: 25,
              height: 25,
              borderRadius: 40 / 2,
            }}
          />
        );
      }
      else if (routeName === 'Notification') {
        return (
          <Image
            source={
              focused
                 ? require('./src/assets/img/rednotification.png')
                : require('./src/assets/img/notification.png')
            }
            style={{
              width: 25,
              height: 25,
              borderRadius: 40 / 2,
            }}
          />
        );
      }
      
   
    else if (routeName === 'Account') {
      return (
        <Image
          source={
            focused
               ? require('./src/assets/img/reduser.png')
              : require('./src/assets/img/user.png')
          }
          style={{
            width: 25,
            height: 25,
            borderRadius: 40 / 2,
          }}
        />
      );
    }
    
  }
  }),
  tabBarOptions: {
    activeTintColor: '#DB0A23',
    inactiveTintColor: '#212121',
  },
}
);
// const AppStack = createStackNavigator({
//   Categories : {screen : Categories },
//   Category   : {screen : Category}
// })

const ms = {
  MyService : {screen : MyService}
}

const filter  = {
  Filter        :      {screen : Filter},
  Language      :      {screen : Language},
  Country       :      {screen : Country}
}

const AppNavigator = createStackNavigator({
  
  Splash        :      {screen : Splash},
  Home          :      {screen : TabNavigator},
  ...AuthStack,
  Categories    :      {screen : Categories },
  Category      :      {screen : Category},
  ...filter,        
  SubCategories :      {screen : SubCategories},
  WriteReviews  :      {screen : WriteReviews},
  ServiceDetail :      {screen : ServiceDetail},
  UserOrderReview:     {screen : UserOrderReview},
  OrderSuccess  :      {screen : OrderSuccess},
  OrderDetail   :      {screen : OrderDetail },
  Earnings      :      {screen : Earnings},
  BankDetail    :      {screen : BankDetail}, 
  About         :      {screen : About},
  Policy        :      {screen : Policy},
  Terms         :      {screen : Terms },  
  AddSeller1    :      {screen : AddSeller1},
  AddSeller2    :      {screen : AddSeller2},  
  Loader        :      {screen : Loader},  
  EditSeller1   :      {screen : EditSeller1},
  EditSeller2   :      {screen : EditSeller2},
  SearchPage    :      {screen : SearchPage},
  ApprovalPage  :      {screen : ApprovalPage},
  VideoPlay     :      {screen : VideoPlay},
  ChatScreen    :      {screen : ChatScreen},
  ...editService,
  ...ms,
  ...addService
  },{
    mode: 'modal',
    headerMode: 'none',
  }
  
)
const AppContainer = createAppContainer(AppNavigator)


class StackNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <AppContainer />
    )
  }

}
export default StackNavigation;