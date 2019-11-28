import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

// const initialState = {
//   items: [],
//   loading: false
// };
const initialState = {
  products:[],
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items:action.payload,
        loading:false
      }
    case "GET_PRODUCTS":
      return {
        ...state,
        products:action.payload,
        loading: false
      };
    case DELETE_ITEM:
      console.log("rahl")
      const arr=state.products.filter(product=>product._id!==action.payload)
      console.log(arr)
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        products:state.products.filter(product=>product._id!==action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case "PRODUCT_REPEATED":
      return {
        ...state,
        loading:false
      }
      case "UPDATE_ITEM":
        return {
          ...state
        }
    default:
      return state;
  }
}
