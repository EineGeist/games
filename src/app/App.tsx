import React, { FC, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from 'api/actions';
import './App.scss';
import Header from './Header/Header';
import GamesPage from 'gamesList/components/GamesPage';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Header />
      <main className="app-main">
        <Switch>
          <Route path="/" exact={true} component={RedirectToGames} />
          <Route path="/games" exact={true} component={RedirectToGames} />
          <Route path="/games/:page" component={GamesPage} />
        </Switch>
      </main>
    </>
  );
};

const RedirectToGames: FC = () => {
  return <Redirect to="/games/1" />;
};

export default App;
