import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const initialState = {
    isLoading: false,
    isError: false,
    flights: [], // bütün uçuşların izlediği yol
    path: [], //sadece 1 uçusun izlediği yol
}

const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {

        //map bileşeninde kullanılacak rotayı belirlemek için
        setPath: (state, action) => {
            state.path = action.payload;
        },
        // meccut rotayı temizler
        clearPath: (state) => {
            state.path = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFlights.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFlights.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(getFlights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.flights = action.payload;
        });

    },
});

export const { setPath, clearPath } = flightSlice.actions
export default flightSlice.reducer;