import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import SessionBoard from './components/SessionBoard';
import { GlobalStyles } from './styles';

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/:sessionid" component={SessionBoard} />
            <Route exact path="/:sessionid/:chatid" component={SessionBoard} />
            <Route exact path="*" component={NotFound} />
          </Switch>
      </BrowserRouter>
    </>
  );
}

// export default App;
export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
