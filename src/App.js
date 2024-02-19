import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './components/Countries';
import CountriesSingle from './components/CountriesSingle';
import Home from './components/Home';
import Layout from './pages/Layout';
import PrivateRoutesLayout from './layouts/PrivateRoutesLayout';
import { firebaseauth } from './firebase/config';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountriesData } from './features/countries/countriesSlice';
import BackgroundImage from './components/BackgroundImage';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector(
    (state) => state.countriesReducer
  );
  console.log(isLoading);
  console.log(data);
  console.log(error);

  console.log(firebaseauth);

  useEffect(() => {
    dispatch(fetchCountriesData());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route element={<PrivateRoutesLayout />}>
            <Route path='/countries' element={<Countries />} />
            <Route path='/countries/:single' element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
      <BackgroundImage />
    </BrowserRouter>
  );
};

export default App;
