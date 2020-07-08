import React, { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from 'api/actions';
import './App.scss';
import Header from './Header/Header';
import GamesPage from 'games/components/GamesPage';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Header />
      <main className="app-main">
        <Route path="/:page" component={GamesPage} />
      </main>
    </>
  );
};

export default App;
