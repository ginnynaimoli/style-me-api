import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name:'cart',
  initialState: {
    products: [],
    cartQuantity: 0,
    totalPrice: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.cartQuantity += action.payload.itemQuantity
      state.products.push(action.payload)
      state.totalPrice += action.payload.price * action.payload.itemQuantity
    },
    increaseQuantity: (state, action) => {
      state.products.find(item => item._id === action.payload._id).itemQuantity +=1
      state.cartQuantity += 1
      state.totalPrice += action.payload.price
    }, 
    decreaseQuantity: (state, action) => {
      state.products.find(item => item._id === action.payload._id).itemQuantity -= 1
      state.cartQuantity -= 1
      state.totalPrice -= action.payload.price
    }, 
    deleteProduct: (state, action) => {
      state.products.splice(state.products.findIndex(item => item._id === action.payload._id), 1)
      state.cartQuantity -= action.payload.itemQuantity
      state.totalPrice -= action.payload.price * action.payload.itemQuantity
    }, 
    resetProduct: (state) => {
      state.products = []
      state.cartQuantity = 0
      state.totalPrice = 0
    }
  }
})

export const { addProduct, increaseQuantity, decreaseQuantity, deleteProduct, resetProduct } = cartSlice.actions

export default cartSlice.reducer