import React, { FC } from 'react';
import Header from './Header/Header';

const App: FC = () => {
  return (
    <>
      <Header />
      <main className="app-main"></main>
    </>
  );
};

export default App;
