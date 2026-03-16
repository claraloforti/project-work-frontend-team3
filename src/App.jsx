import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { CartProvider } from "./contexts/CartContext"
import { WishlistProvider } from "./contexts/WishlistContext"
import Homepage from "./pages/Homepage";
import WhiskyPage from "./pages/WhiskyPage";
import WhiskyDetailPage from "./pages/WhiskyDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import NotFoundPage from "./pages/NotFoundPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>

              <Route index element={<Homepage />} />

              <Route path="/whisky" element={<WhiskyPage />} />

              <Route path="/whisky/:slug" element={<WhiskyDetailPage />} />

              <Route path="/checkout" element={<CheckoutPage />} />

              <Route path="/success" element={<SuccessPage />} />

              <Route path="/wishlist" element={<WishlistPage />} />

              <Route path="*" element={<NotFoundPage />} />


            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider >
  );
}

export default App;