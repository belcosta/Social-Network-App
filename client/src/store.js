import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //once the file is called index.js, we can specify just the file

const InitialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
