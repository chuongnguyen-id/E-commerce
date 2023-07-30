import React from "react";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../../components/admin/home/Home";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
