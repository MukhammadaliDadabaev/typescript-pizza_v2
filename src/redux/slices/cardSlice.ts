import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  type: string;
  size: number;
  imageUrl: string;
};
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    //-------------> Korzinka-remov-card
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },

    //------> REMOV-CARD va Price
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// REFACTORE-useSelector
export const selectCard = (state: RootState) => state.card;
export const selectCardItemById = (id: string) => (state: RootState) =>
  state.card.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cardSlice.actions;

export default cardSlice.reducer;
