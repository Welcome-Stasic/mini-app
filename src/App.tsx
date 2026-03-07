import { HashRouter } from "react-router-dom";
import AppRoutes from "./router/routes";
import { StoreProvider } from "./store/storeProvider.tsx";

function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </StoreProvider>
  );
}

export default App;
