import { Route, Routes } from "react-router";
import MainLayout from "./MainLayout";
import BookingPage from "./booking/BookingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route index element={<BookingPage />} />
      </Route>
    </Routes>
  );
}
