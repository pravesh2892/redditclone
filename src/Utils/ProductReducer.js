import ACTION_TYPE from "./ActionType";

const initialState ={
    data:[],
    wishlist:[], 
    cart:[], 
}

function dataReducer(state=initialState, action){

    switch (action.type){
        case ACTION_TYPE.SET_DATA:
            return {...state, data:action.payload};

            
            case ACTION_TYPE.ADD_TO_WISHLIST:
                return{...state, wishlist: action.payload};
                
                
            case ACTION_TYPE.GET_WISHLIST:
                return {...state, wishlist: action.payload};

            case ACTION_TYPE.REMOVE_FROM_WISHLIST:
                return {...state, wishlist: action.payload};

            case ACTION_TYPE.ADD_CART:
                return{ ...state, cart: action.payload};

            case ACTION_TYPE.GET_CART:
                return{...state, cart: action.payload};

            case ACTION_TYPE.REMOVE_FROM_CART:
                return { ...state,
                    cart: state.cart.filter((item) => item.productId !== action.payload),
                  };
                  
                   

            default:
                return state;

        
    }
}

export default dataReducer;