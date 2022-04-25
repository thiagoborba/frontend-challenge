import React, { Fragment } from 'react';
import { Routes } from './Routes';
import { GlobalContextProvider } from './Context'

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalContextProvider >
        <Routes />
      </GlobalContextProvider>
    </Fragment>
  );
}

export default App;
