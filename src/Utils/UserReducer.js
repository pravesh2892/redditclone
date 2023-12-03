import { LOGOUT } from "./Action";
import Action_Type from "./ActionType";

const initialState ={
    isLoggedIn: localStorage.getItem("authToken") ? true : false,
    userInfo: {},
    message:"",
    token:"",
}

const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case Action_Type.LOGIN_FAILURE:
            return{...state,  message: action.payload, isLoggedIn:false};

        case Action_Type.SIGNUP_SUCCESS:
            return{...state, isLoggedIn: true, userInfo: action.payload, message:""};
            
        case Action_Type.LOGIN_SUCCESS:
            return{...state, isLoggedIn: true, userInfo: action.payload, message:""};

        case Action_Type.LOGOUT:
            localStorage.removeItem("authToken");
            return{  ...state, isLoggedIn: false, userInfo: null}

          

        default:
            return state;
    }
}

export default userReducer;