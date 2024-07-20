import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./slices/flightSlices";

export default configureStore({ reducer: { flightReducer } })