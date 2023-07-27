import React from "react";
import styles from "./Product.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import useFetchCollection from "../../customHooks/useFetchCollection";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  console.log(data);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside></aside>
        <div>
          <img
            src={spinnerImg}
            alt="Loading..."
            style={{ width: "50px" }}
            className="--center-all"
          />
        </div>
      </div>
    </section>
  );
};

export default Product;
