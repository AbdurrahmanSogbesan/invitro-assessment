import "./App.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./components/AppRoutes";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
