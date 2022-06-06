import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./style.css";

import { store, persistor } from "store";
import Home from "pages/Home";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="container">
          <Home />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
