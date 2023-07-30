import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createAt", "desc"));
      console.log(q);

      onSnapshot(q, (snapshot) => {
        console.log(snapshot);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return <div>ViewProducts</div>;
};

export default ViewProducts;
