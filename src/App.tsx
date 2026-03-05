import { HashRouter } from "react-router-dom";
import { MyEventsProvider } from "./context/MyEventsContext";
import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./router/routes";
import { ThemeProvider } from "./context/ThemeContext.tsx";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MyEventsProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </MyEventsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
