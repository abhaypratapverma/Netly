import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personSlice"; // ✅ Default import
import tvReducer from "./reducers/tvSlice"; // ✅ Default import
import movieReducer from "./reducers/movieSlice"; // ✅ Default import
export const store = configureStore({
  reducer: {
     person: personReducer,
     tv: tvReducer,
     movie: movieReducer
  },
})