import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

interface DataState {
  loading: boolean;
  error: string | null;
  data: any[]; 
}

const initialState: DataState = {
  loading: false,
  error: null,
  data: [],
};

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      return response.data;
      
    } catch (error:any) {
        console.log("Error in fetching users : ", error);
        toast.error(error?.response?.data?.error)
        throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as any;
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
    });
  },
});

export default userSlice.reducer;
