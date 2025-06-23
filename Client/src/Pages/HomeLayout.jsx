import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      {isLoading ? (
        <p>...Loading</p>
      ) : (
        <section>
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  )
};

export default HomeLayout;
