

const initState = {
  is_authed: false,
  loginStatus: '', register: '', token: '',
  category: '', products: '', product: '',
  getItems: '', items: '', recentService: '',
  seller: '', serviceByid: '', serviceDetail: '',
  getOrders: '', getSellerOrders: '', getOrder: '',
  changeOrderStatus: '', getProfile: '', messages: '',
  userReviews: '', runningOrder: '',
  sellerServices: '', getBanner: '',
  removeItem: '',topServices:'',
  ad_seller: '',
  checkBtn: null,
  switchSeller: '',
  getSeller: "",
  myEarns: '',
  bankDetail: '',
  withdrwal: "",
  searchItem: '',
  getNN: '',
  genrateOrd: '',
  createOrd: '',
  conversations:[],
  receiverId:'',
  receiverName: '',
  receiverPic:'',
  unreadMessageCount: [],
  unreadCount: 0

}


const common = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'addUnreadCount': {
      var senderCount = state.unreadMessageCount.find(item => item.receiverId === payload)
      console.log('senderCount up', senderCount)
      if(senderCount){
        senderCount.count = senderCount.count + 1
      }else{
        senderCount = {
          receiverId: payload,
          count: 1
        }
      }
      return { ...state, unreadMessageCount: [...state.unreadMessageCount.filter(item => item.receiverId !== payload), senderCount] }
    }
    case 'addAllUnreadCount': {
      return { ...state, unreadCount: state.unreadCount + 1 }
    }
    case 'resetAllUnreadCount': {
      return { ...state, unreadCount: 0 }
    }
    case 'resetUnreadCount': {
      return { ...state, unreadMessageCount: [...state.unreadMessageCount.filter(item => item.receiverId !== payload)] }
    }

    case 'setRecieverId': {
      return { ...state, receiverId: action.payload, receiverName: action.receiverName, receiverPic: action.receiverPic }
    }

    case 'sortConversation': 
      return { ...state, conversations: [ payload,  ...state.conversations.filter(item=> item.receiver_id !== payload.receiver_id)]}

    case 'fetchConversationFulfiled': {
      return { ...state, conversations: action.payload.data }
    }

    case 'fetchConversationRejected': {
      return { ...state, error: action.payload.error, conversations:[], }
    }

    
    case "FETCH_LOGIN_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_LOGIN_FULFILLED": {
      return { ...state, is_authed: true, loginStatus: action.payload }
      break;
    }
    /////
    case "FETCH_REGISTER_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_REGISTER_FULFILLED": {
      return { ...state, is_authed: true, register: action.payload }
      break;
    }

    case "FETCH_TOKEN_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_TOKEN_FULFILLED": {
      return { ...state, is_authed: true, token: action.payload }
      break;
    }

    ////

    case "FETCH_BANNER_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_BANNER_FULFILLED": {
      return { ...state, is_authed: true, getBanner: action.payload }
      break;
    }

      ////

      
      case "FETCH_TOPSERVICE_REJECTED": {
        return { ...state, is_authed: false, error: action.payload }
        break;
      }
  
      case "FETCH_TOPSERVICE_FULFILLED": {
        return { ...state, is_authed: true, topServices: action.payload }
        break;
      }
    ////

    case "FETCH_GETPROFILE_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_GETPROFILE_FULFILLED": {
      return { ...state, is_authed: true, getProfile: action.payload }
      break;
    }
    ////
    case "FETCH_CATEGORY_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_CATEGORY_FULFILLED": {
      return { ...state, is_authed: true, category: action.payload }
      break;
    }
    ///

    case "FETCH_RSRVCE_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_RSRVCE_FULFILLED": {
      return { ...state, is_authed: true, recentService: action.payload }
      break;
    }
    ///

    case "FETCH_CATSRVCE_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_CATSRVCE_FULFILLED": {
      return { ...state, is_authed: true, serviceByid: action.payload }
      break;
    }
    ///
    case "FETCH_SRVCE_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_SRVCE_FULFILLED": {
      return { ...state, is_authed: true, serviceDetail: action.payload }
      break;
    }

    ///
    case "FETCH_Messages_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_Messages_FULFILLED": {
      return { ...state, is_authed: true, messages: action.payload }
      break;
    }
    ///

    case "FETCH_GETORDERS_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_GETORDERS_FULFILLED": {
      return { ...state, is_authed: true, getOrders: action.payload }
      break;
    }

    case "FETCH_SellerOrder_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_SellerOrder_FULFILLED": {
      return { ...state, is_authed: true, getSellerOrders: action.payload }
      break;
    }


    case "FETCH_GETORDER_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_GETORDER_FULFILLED": {
      return { ...state, is_authed: true, getOrder: action.payload }
      break;
    }

    case "FETCH_Change_OrderStatus_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_Change_OrderStatus_FULFILLED": {
      return { ...state, is_authed: true, changeOrderStatus: action.payload }
      break;
    }

    ///

    case "FETCH_UserReviews_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_UserReviews_FULFILLED": {
      return { ...state, is_authed: true, userReviews: action.payload }
      break;
    }

    ///

    case "FETCH_RunningOrder_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_RunningOrder_FULFILLED": {
      return { ...state, is_authed: true, runningOrder: action.payload }
      break;
    }

    case "FETCH_SELLERSERVICES_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_SELLERSERVICES_FULFILLED": {
      return { ...state, is_authed: true, sellerServices: action.payload }
      break;
    }


    case "FETCH_DELETESERVICE_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_DELETESERVICE_FULFILLED": {
      return { ...state, is_authed: true, removeItem: action.payload }
      break;
    }

    case "FETCH_ADD_SELLER_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_ADD_SELLER_FULFILLED": {
      return { ...state, is_authed: true, ad_seller: action.payload }
      break;
    }

    case "FETCH_CHECK_BUTTON_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_CHECK_BUTTON_FULFILLED": {
      return {
        ...state, is_authed: true,
        checkBtn: action.checkToggleBtn
      }
      break;
    }


    case "FETCH_SWITCH_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_SWITCH_FULFILLED": {
      return {
        ...state, is_authed: true,
        switchSeller: action.payload
      }
      break;
    }

    case "FETCH_GET_SELLER_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_GET_SELLER_FULFILLED": {
      return {
        ...state, is_authed: true,
        getSeller: action.payload
      }
      break;
    }

    case "FETCH_Earning_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_Earning_FULFILLED": {
      return {
        ...state, is_authed: true,
        myEarns: action.payload
      }
      break;
    }

    case "FETCH_BankDetails_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_BankDetails_FULFILLED": {
      return {
        ...state, is_authed: true,
        bankDetail: action.payload
      }
      break;
    }


    case "FETCH_WITHDRWAL_REJECTED": {
      return { ...state, is_authed: false, error: action.payload }
      break;
    }

    case "FETCH_WITHDRWAL_FULFILLED": {
      return {
        ...state, is_authed: true,
        withdrwal: action.payload
      }
      break;
    }


    case "FETCH_SEARCH_REJECTED": {
      return {
        ...state, is_authed: false,
        error: action.payload
      }
      break;
    }

    case "FETCH_SEARCH_FULFILLED": {
      return {
        ...state, is_authed: true,
        searchItem: action.payload
      }
      break;
    }


    case "FETCH_Notifiations_REJECTED": {
      return {
        ...state, is_authed: false,
        error: action.payload
      }
      break;
    }

    case "FETCH_Notifiations_FULFILLED": {
      return {
        ...state, is_authed: true,
        getNN: action.payload
      }
      break;
    }



    case "FETCH_CreateOrder_REJECTED": {
      return {
        ...state, is_authed: false,
        error: action.payload
      }
      break;
    }

    case "FETCH_CreateOrder_FULFILLED": {
      return {
        ...state, is_authed: true,
        createOrd: action.payload
      }
      break;
    }


    case "FETCH_PlaceOrder_REJECTED": {
      return {
        ...state, is_authed: false,
        error: action.payload
      }
      break;
    }

    case "FETCH_PlaceOrder_FULFILLED": {
      return {
        ...state, is_authed: true,
        genrateOrd: action.payload
      }
      break;
    }









    default:
      return state
  }
}

export default common