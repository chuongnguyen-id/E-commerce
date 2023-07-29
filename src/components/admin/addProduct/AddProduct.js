import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts } from "../../../redux/slice/productSlice";
import Card from "../../card/Card";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 1, name: "Electronics" },
  { id: 1, name: "Fashion" },
  { id: 1, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  // const {id}=useParams();
  // const products = useSelector(selectProducts);
  // const productEdit = products.find((item)=>item.id ===id);
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = (e) => {};
  const handleImageChange = (e) => {};

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <input
              type="text"
              name="imageURL"
              value={product.imageURL}
              required
              disabled
            />
          </Card>

          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={product.price}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
            required
          >
            <option value="" disabled>
              -- Choose Product Category --
            </option>
            {categories.map((cate) => {
              return (
                <option key={cate.id} value={cate.name}>
                  {cate.name}
                </option>
              );
            })}
          </select>

          <label>Product Brand:</label>
          <input
            type="text"
            placeholder="Product Brand"
            name="brand"
            value={product.brand}
            onChange={(e) => handleInputChange(e)}
            required
          />

          <label>Product Description</label>
          <textarea
            name="desc"
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
            required
            rows="10"
            cols="30"
          ></textarea>

          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
