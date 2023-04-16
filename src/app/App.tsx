import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from 'router/index';

export function App() {
  return (
    // BrowserRouter был заменён т.к. на gitHub pages из-за него не работает
    <HashRouter>
      <Router />
    </HashRouter>
  );
}
