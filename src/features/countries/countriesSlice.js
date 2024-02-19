import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  data: [],
  country: null,
  error: null,
};

export const fetchCountriesData = createAsyncThunk(
  'api/getCountriesData',
  async () => {
    try {
      const { data } = await axios('https://restcountries.com/v3.1/all');
      return data;
    } catch (error) {
      console.log(`${error} error while fetching countries data`);
      throw new Error(error.message);
    }
  }
);

export const fetchCountryDetails = createAsyncThunk(
  'api/getCountryData',
  async (countryName) => {
    try {
      const { data } = await axios(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      console.log('AXIOS details: ', data);
      return data;
    } catch (error) {
      console.log(`${error} error while fetching country details`);
      throw new Error(error.message);
    }
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCountriesData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCountryDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.country = action.payload[0];
      })
      .addCase(fetchCountryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }),
});

export default countriesSlice.reducer;
