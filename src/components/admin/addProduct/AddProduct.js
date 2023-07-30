import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectProducts } from "../../../redux/slice/productSlice";
import Card from "../../card/Card";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "./../../loader/Loader";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
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
    ...initialState,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product Uploaded Successfully!");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>Add New Product</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={addProduct}>
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
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
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
    </>
  );
};

export default AddProduct;
