import { Provider } from "react-redux";
import { Store } from "redux";

import { AppRouter } from "./routers";
import { AppState } from "./store";

interface IProps {
  store: Store<AppState>;
}

export const App = (props: IProps) => (
  <Provider store={props.store}>
    <AppRouter />
  </Provider>
);