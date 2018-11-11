import React from "react";
import { Provider } from "react-redux";

import rootSaga from "global/sagas";
import configureStore from "global/store";
import getRoutes from "routes";

const store = configureStore({});
store.runSaga(rootSaga);

const App = () => <Provider store={store}>{getRoutes(store)}</Provider>;

export default App;
