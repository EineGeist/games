import React, { FC, useEffect } from 'react';
import './App.scss';
import Header from './Header/Header';
import { fetchData } from 'data/actions';
import { useDispatch } from 'react-redux';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Header />
      <main className="app-main"></main>
    </>
  );
};

export default App;
