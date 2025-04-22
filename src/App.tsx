import "./App.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./components/AppRoutes";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
