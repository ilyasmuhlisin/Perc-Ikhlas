import * as actionTypes from "../constants/cartConstants";

// export const counterReducer = (state = {value: 0}, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_TO_CART:
//             return {value: state.value + 1 + action.someValue}
//         default:
//            return state
//     }
// }

// nilai awal kosong
const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;

      // cek apakah product sudah ada
      const productAlreadyExistsInState = state.cartItems.find(
        (x) => x.productID === productBeingAddedToCart.productID
      );

      //   product saat ini
      const currentState = { ...state };

      if (productAlreadyExistsInState) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;
        currentState.cartItems = state.cartItems.map((x) => {
          if (x.productID === productAlreadyExistsInState.productID) {
            // menambahkan kuantitas
            currentState.itemsCount += Number(productBeingAddedToCart.quantity);
            // mengalikan kuantitas dengan harga
            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price);
            //   menambahkan cartSubtotal dengan sum hasil perkalian harga
            currentState.cartSubtotal += sum;
          } else {
            // jika tidak samaa tambahkan kuantitas
            currentState.itemsCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }
          return x.productID === productAlreadyExistsInState.productID
            ? productBeingAddedToCart
            : x;
        });
      } else {
        currentState.itemsCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price);
        currentState.cartSubtotal += sum;
        currentState.cartItems = [...state.cartItems, productBeingAddedToCart];
      }

      return currentState;
    //   console.log(action.payload);
    //   return state;
    default:
      return state;
  }
};
