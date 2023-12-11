import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../APIs/axiosInstance";

const initialState = {
    orders: [],
    isLoading: false
}

export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData) => {
        try {
            const response = await axiosInstance.post('/order/create', orderData)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getOrder = createAsyncThunk(
    'order/get',
    async () => {
        try {
            const response = await axiosInstance.get('/order-list')
            console.log("response getOrder", response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder(state) {
            state.orders = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.orders = [...state.orders, action.payload]
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
            })
            .addCase(getOrder.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = true
            })
    }
})

export const { resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer
