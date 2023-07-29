import React, { useEffect } from "react";
import styles from "./Product.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  //   const products = useSelector(selectProducts)
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside></aside>
        <div className={styles.content}>
            {isLoading?
          <img
            src={spinnerImg}
            alt="Loading..."
            style={{ width: "50px" }}
            className="--center-all"
          />:''}
        </div>
      </div>
    </section>
  );
};

export default Product;
