import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { hot, setConfig } from 'react-hot-loader';


setConfig({
  showReactDomPatchNotification: false
})

if ((module as any).hot && (module as any).hot.active) {
  console.log("rem普通方案");
} else {
  console.log("rem高清方案");
}


const AppDemo: React.FC = () => <div>Lorem ipsum dolor sit amet</div>

const App: React.FC = () => {

  return (
    <div>
      <BrowserRouter>
          <Switch>
            <Route path="/webpack/demo" component={AppDemo} />
          </Switch>
      </BrowserRouter>
    </div>
  );
};

export default (hot as any)(module)(App);
