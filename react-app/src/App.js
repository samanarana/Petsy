import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductsPage from "./components/ProductsPage/index";
import HomePage from "./components/HomePage/index";
import FavoritesPage from "./components/FavoritesPage/index";
import ProductDetailsPage from "./components/ProductDetailsPage/index";
// import ReviewFormPage from "./components/ReviewPage/ReviewPage";
import CartPage from "./components/CartPage/index";
import ListingsPage from "./components/ListingsPage/index";
import AddAListing from "./components/ListingForm/AddAListing";
import UpdateListing from "./components/ListingForm/UpdateListing";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/products/:productId/review/:reviewId"><ReviewFormPage /></Route>
          <Route path="/products/:productId/reviews/new">
            <ReviewFormPage />
          </Route> */}
          <Route path="/products/:productId">
            <ProductDetailsPage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/users/:userId/favorites">
            <FavoritesPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/listings">
                <ListingsPage />
          </Route>
          <Route path="/add-listing">
            <AddAListing />
          </Route>
          <Route path="/update/:productId">
            <UpdateListing />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
