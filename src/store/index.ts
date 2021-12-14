import {
    applyMiddleware,
    combineReducers,
    createStore,
    Store,
    compose,
} from "redux";
import thunk from "redux-thunk";

import { UiState, uiReducer } from "./ui";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export interface AppState {
    ui: UiState;
}

const rootReducer = combineReducers<AppState>({
    ui: uiReducer,
});

export default function configureStore(): Store<AppState> {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        rootReducer,
        /* preloadedState, */
        composeEnhancers(applyMiddleware(thunk))
    );
}