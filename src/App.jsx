import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

import Homepage from "./pages/Homepage";
import FilteredWhiskyPage from "./pages/FilteredWhiskyPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>

          <Route index element={<Homepage />} />

          <Route path="/filtered" element={<FilteredWhiskyPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/wishlist" element={<WishlistPage />} />

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;