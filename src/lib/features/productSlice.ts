import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../types/columns';
import { RootState } from '../store' 
// import { getProducts } from '.././../app/page'

interface ProductsState {
    products: Product[] | null;
    item: string,
    status: string,
    error: string | null
  }

  export const searchAsyncProducts = createAsyncThunk (
    'products/searchAsyncProducts', async (term: any) => {
        try {
            const response = await fetch('http://3.88.1.181:8000/products/public/catalog?supplier=FragranceX&search=' + term)
            console.log(await response.json())
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }
  )

  const initialState: ProductsState = {
    products: null || [],
    item: '',
    status: 'idle',
    error: null,
  };

const productsSlice = createSlice({
    name: 'products',
    initialState,    
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },

    },
    extraReducers: (builder) => {
            builder.addCase(searchAsyncProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('fetched successfully')
                const data = state.products = action.payload
                console.log(data)
            });
            builder.addCase(searchAsyncProducts.rejected, (state, action) => {
                state.status = 'failed'
                // state.error = action.error.message
                console.log('rejected')
            });
            builder.addCase(searchAsyncProducts.pending, (state, action) => {
                state.status = 'loading'
                console.log('pending')
            });
        },

})

export const getProductsStatus = (state: RootState) => state.products.status;
export const getProductsError = (state: RootState) => state.products.error;
export const getProducts = (state: RootState) => state.products.products;


export const { setProducts, setItem } = productsSlice.actions;


export default productsSlice.reducer;