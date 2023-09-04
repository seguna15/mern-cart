import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    error: null
}

// payload generator fetching products from api endpoint
export  const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id=null, {rejectWithValue}) => {
        try {
             const response = await axios.get(
               "http://localhost:8000/api/v1/products/"
             );
             return response?.data;
        } catch (error) {
            return rejectWithValue("an error occurred");
        }
       
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(productsFetch.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload
            })
            .addCase(productsFetch.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
    }
   
});

export default productsSlice.reducer