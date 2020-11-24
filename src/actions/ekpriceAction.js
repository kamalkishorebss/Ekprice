import axios from "axios";
import {commonConstant as type}  from '../constants/urfFextConstants';
import { API_URL } from '../config/config';






export const LoginUser = (email,password) => {
    //https://natav.net/apis/app/login_api?_key=b(PVzbC46X&username=3174&password=2920&fcm=123456789&app_type=1&app_version=1
    console.log(`${API_URL}login?email=${email}&password=${password}`)
	return (dispatch) => {
		return axios.post(`${API_URL}login?email=${email}&password=${password}`) 
        .then(data => {
           console.log('hhhh',data)
           dispatch({
                 type: type.FETCH_LOGIN_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_LOGIN_REJECTED,
                    payload: err,
                })
               return err 
                
            })
	}
}


export const saveDeviceToken = (params) => {
    return (dispatch) => {
        https://www.ekprice.com/api/editDeviceDetails
        console.log(`${API_URL}editDeviceDetails?user_id=${params.userID}&device_id=${params.deviceId}&device_type=${params.device_type}`)
        return axios.post(`${API_URL}editDeviceDetails?user_id=${params.userID}&device_id=${params.deviceId}&device_type=${params.device_type}`)          
        .then(data => {
           // console.log(data.data)
            
           dispatch({
                 type: "FETCH_TOKEN_FULFILLED",
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: "FETCH_TOKEN_REJECTED",
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const RegisterUser = (username,email,password,code,phone,loginType) => {
    console.log(loginType)
    let url = '';
    if(loginType == 'Email'){
       url = `${API_URL}ekprice-register-user?name=${username}&email=${email}&phone_no=${phone}&password=${password}&c_password=${password}&phone_code=${code}`
    }else{
       url = `${API_URL}ekprice-register-user-social?name=${username}&email=${email}&logintype=${loginType}`
    }
	return (dispatch) => {
		console.log(url)
		return axios.post(url)
        .then(res => {
           console.log('ffff',res.data)
            dispatch({
                 type: type.FETCH_REGISTER_FULFILLED,
                 payload: res.data})
                 return res.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_REGISTER_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
	}
}

export const getBanner = () => {
    https://www.ekprice.com/api/all-main-banner
    console.log(`${API_URL}all-main-banner`) 
   return (dispatch) => {
      return axios.get(`${API_URL}all-main-banner`)
       .then(data => {
           //console.log(data.data)
           
          dispatch({
                type: type.FETCH_BANNER_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_BANNER_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}

export const getTopservice = () => {
    
   
    console.log(`${API_URL}all-best-service-banner`) 
   return (dispatch) => {
      return axios.get(`${API_URL}all-best-service-banner`)
       .then(data => {
           //console.log(data.data)
           
          dispatch({
                type: type.FETCH_TOPSERVICE_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_TOPSERVICE_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}

export const getUserProfile = (id) => {

    console.log(`${API_URL}profile/${id}`) 
   return (dispatch) => {
      return axios.get(`${API_URL}profile/${id}`)
       .then(data => {
           //console.log(data.data)
           
          dispatch({
                type: type.FETCH_GETPROFILE_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_GETPROFILE_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}

export const checkToggle = (checkToggleBtn) => {

    
   return (dispatch) => {
      return axios.get(`https://www.google.com/`)
       .then(data => {
           //console.log(data.data)
           
          dispatch({
                type: type.FETCH_CHECK_BUTTON_FULFILLED,
                payload: data.data,
                checkToggleBtn
            })
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_CHECK_BUTTON_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}




export const get_Category = () => {

     console.log(`${API_URL}ALLCategories_and_subcategories`) 
    return (dispatch) => {
       return axios.get('https://www.ekprice.com/api/ALLCategories_and_subcategories')
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_CATEGORY_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_CATEGORY_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const switch_Seller = (id) => {
   
    console.log(`${API_URL}switch-user/${id}?type=seller`)
    return (dispatch) => {
        
       return axios.post(`${API_URL}switch-user/${id}?type=seller`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_SWITCH_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_SWITCH_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const getSellerProfile = (id) => {
   
    console.log(`${API_URL}getSellerdetails/${id}`)
    return (dispatch) => {
        
       return axios.get(`${API_URL}getSellerdetails/${id}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_GET_SELLER_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_GET_SELLER_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const get_RunningOrder = (id) => {
    console.log(`${API_URL}running_orders/${id}`) 
   return (dispatch) => {
      return axios.get(`${API_URL}running_orders/${id}`)
       .then(data => {
           console.log(data.data)
           
          dispatch({
                type: type.FETCH_RunningOrder_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_RunningOrder_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}

export const get_UserReviews = () => {

    console.log(`${API_URL}customer_reviews`) 
   return (dispatch) => {
      return axios.get(`${API_URL}customer_reviews`)
       .then(data => {
           //console.log(data.data)
           
          dispatch({
                type: type.FETCH_UserReviews_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_UserReviews_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}

export const recentService = () => {

    // console.log(`${API_URL}custom/v1/live-competitions`) 
    return (dispatch) => {
       return axios.get(`${API_URL}recently_addedservices`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_RSRVCE_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_RSRVCE_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const getServicebyID = (id) => {

     console.log(`${API_URL}categoryservices/${id}`) 
    return (dispatch) => {
       return axios.get(`${API_URL}categoryservices/${id}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_CATSRVCE_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_CATSRVCE_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const getServiceDetail = (id) => {
   console.log('hhhhhhhhhhh',`${API_URL}service_detail/${id}`) 
   return (dispatch) => {
      return axios.get(`${API_URL}service_detail/${id}`)
       .then(data => {
           //console.log(data.data)
          dispatch({
                type: type.FETCH_SRVCE_FULFILLED,
                payload: data.data})
                return data.data
           })
           .catch((err) => {
               //console.log(JSON.stringify(err))
               dispatch({
                   type: type.FETCH_SRVCE_REJECTED,
                   payload: err,
                   
               })
              return err 
               
           })
   }
}







export const get_Order = (id,status) => {
   
    console.log(`${API_URL}orderlistbyuser/${id}/${status}`)
    return (dispatch) => {
        
       return axios.get(`${API_URL}orderlistbyuser/${id}/${status}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_GETORDERS_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_GETORDERS_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}



export const get_SellerOrder = (id,status) => {
    console.log(`${API_URL}getAllOrders?sallerId=${id}&status=${status}`)
    return (dispatch) => {
        
       return axios.post(`${API_URL}getAllOrders?sallerId=${id}&status=${status}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_SellerOrder_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_SellerOrder_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


export const get_OrderById = (id) => {
    
    console.log(`${API_URL}orderdetail/${id}`)
    return (dispatch) => {
        
       return axios.get(`${API_URL}orderdetail/${id}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_GETORDER_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_GETORDER_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}



///change order status 


export const change_OrderStatus = (id,status) => {
    //https://www.ekprice.com/api/changeorderstatus/54?status=inprogress
    console.log(`${API_URL}changeorderstatus/${id}?status=${status}`)
    return (dispatch) => {
        
       return axios.get(`${API_URL}changeorderstatus/${id}?status=${status}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_Change_OrderStatus_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_Change_OrderStatus_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}



///seller api
export const getServiceBySaller = (id) => {
   console.log(`https://www.ekprice.com/api/getServiceBySeller/${id}`)
    return (dispatch) => {
       return axios.get(`https://www.ekprice.com/api/getServiceBySeller/${id}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_SELLERSERVICES_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_SELLERSERVICES_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


///seller api
export const addSeller = (seller_data) => {
    let formData = new FormData();
    formData.append('user_id',seller_data.user_id)
    formData.append('display_name',seller_data.display_name)
    formData.append('education',seller_data.education)
    formData.append('response_number',seller_data.average_response_time)
    formData.append('response_type',seller_data.average_response_type)
    formData.append('country',seller_data.country)
    formData.append('state',seller_data.state)
    formData.append('city',seller_data.city)
    formData.append('seller_type',1)
    formData.append('business_year',seller_data.years)
    formData.append('technique',seller_data.skills)
    formData.append('gst',seller_data.gst)
    formData.append('about_comany',seller_data.about)
    formData.append('language_1',seller_data.language1)
    formData.append('language_2',seller_data.language2)
    formData.append('language_3',seller_data.language3)
    formData.append('expertise_level_1',seller_data.level1)
    formData.append('expertise_level_2',seller_data.level2)
    formData.append('expertise_level_3',seller_data.level3)
    formData.append('describe_you',seller_data.describe)
    formData.append('about_yourself',seller_data.about)
    formData.append('profile', {
        uri : 'hhhh',
        type : image/JPEG,
        name:`user_pic`
    })
    
    
    console.log(formData)
    return (dispatch) => {
        
       return axios({
           method: 'POST',
           url: `${API_URL}freelencerDetails`,
           data: formData,
           headers: {'Content-Type': 'multipart/form-data' }
       })
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_ADD_SELLER_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: type.FETCH_ADD_SELLER_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const removeService = (id) => {
    
    console.log(`${API_URL}serveiceDelete?service_id=${id}`)
    return (dispatch) => {
        
       return axios.post(`${API_URL}serveiceDelete?service_id=${id}`)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_DELETESERVICE_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_DELETESERVICE_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const YourEarning = (id,from,to) => {
    console.log(id,from,to)
    let url = '';
    if(from == 0 || to == 0){
     url = `${API_URL}sellerEarningDetails?user_id=${id}`
    }else{
     url = `${API_URL}sellerEarningDetails?user_id=${id}&from=${from}&to=${to}`
    }
    console.log(url)
    return (dispatch) => {
       return axios.post(url)
        .then(data => {
            //console.log(data.data)
            
           dispatch({
                 type: type.FETCH_Earning_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_Earning_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


export const getBankDetail = (id) => {
    //https://www.ekprice.com/api/getSellerBankDetails/13680
    console.log(`${API_URL}getSellerBankDetails/${id}`)
    return (dispatch) => {
       return axios.get(`${API_URL}getSellerBankDetails/${id}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_BankDetails_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_BankDetails_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const getwithdrwalList = (id) => {
    //https://www.ekprice.com/api/getSellerBankDetails/13680
    console.log(`${API_URL}getSellerWithdrawals/${id}`)
    return (dispatch) => {
       return axios.get(`${API_URL}getSellerWithdrawals/${id}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_WITHDRWAL_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_WITHDRWAL_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const getSearchResult = (keyword) => {
    //https://www.ekprice.com/api/search-seller-services?keyword =
    console.log(`${API_URL}search-seller-services?keyword=${keyword}`)
    return (dispatch) => {
       return axios.post(`${API_URL}search-seller-services?keyword=${keyword}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_SEARCH_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_SEARCH_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


export const getNotification = (user_id,usertype) => {
    //https://www.ekprice.com/api/search-seller-services?keyword =
    console.log(`${API_URL}notifiations/${user_id}/${usertype}`)
    return (dispatch) => {
       return axios.get(`${API_URL}notifiations/${user_id}/${usertype}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_Notifiations_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_Notifiations_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const createOrder = (user_id,usertype) => {
   
    console.log(`${API_URL}notifiations/${user_id}/${usertype}`)
    return (dispatch) => {
       return axios.post(`${API_URL}notifiations/${user_id}/${usertype}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_CreateOrder_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_CreateOrder_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


export const placeOrder = (user_id,usertype) => {
    
    console.log(`${API_URL}notifiations/${user_id}/${usertype}`)
    return (dispatch) => {
       return axios.post(`${API_URL}notifiations/${user_id}/${usertype}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.FETCH_PlaceOrder_FULFILLED,
                 payload: data.data})
                 return data.data
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.FETCH_PlaceOrder_REJECTED,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}


export const getConversation = (user_id, userType) => {
    console.log('`${API_URL}${userType}/${user_id}`', `${API_URL}${userType}/${user_id}`)
    return (dispatch) => {
       return axios.get(`${API_URL}${userType}/${user_id}`)
        .then(data => {
            //console.log(data.data)
           dispatch({
                 type: type.fetchConversationFulfiled,
                 payload: data.data})
            })
            .catch((err) => {
                //console.log(JSON.stringify(err))
                dispatch({
                    type: type.fetchConversationRejected,
                    payload: err,
                    
                })
               return err 
                
            })
    }
}

export const addMessage = (messageData) => {
    const { sender_id, receiver_id, message, email_message_flag, file, usertype } = messageData
    let formData = new FormData();
    formData.append('sender_id', sender_id)
    formData.append('receiver_id', receiver_id)
    formData.append('message', message)
    formData.append('email_message_flag', email_message_flag)
    formData.append('usertype', usertype)
    return (dispatch) => {
       return axios({
           method: 'POST',
           url: `${API_URL}messages/store/db`,
           data: formData,
           headers: {'Content-Type': 'multipart/form-data' }
       })
        .then(message => {
           console.log('data after messgae create', message)
        })
        .catch((err) => {
            console.log('Error in messgae create', err)
        })
    }
}

export const setReceiverId = (receiverId, receiverName, receiverPic) => {
    return (dispatch) => {
       return dispatch({
            type: type.setRecieverId,
            payload: receiverId,
            receiverName: receiverName,
            receiverPic: receiverPic
       })
    }
}


export const addUnreadCount = (receiverId) => {
    return (dispatch) => {
        return dispatch({
            type: type.addUnreadCount,
            payload: receiverId
        })
    }
}

export const resetUnreadCount = (receiverId) => {
    return (dispatch) => {
        return dispatch({
            type: type.resetUnreadCount,
            payload: receiverId
        })
    }
}

export const sortConversation = (payload) => {
    return (dispatch) => {
        return dispatch({
            type: type.sortConversation,
            payload
        })
    }
}

export const resetTotalUnreadMessage = () => {
    return (dispatch) => {
        return dispatch({
            type: type.resetAllUnreadCount
        })
    }
}
export const addTotalUnreadMessage = () => {
    return (dispatch) => {
        return dispatch({
            type: type.addAllUnreadCount
        })
    }
}

