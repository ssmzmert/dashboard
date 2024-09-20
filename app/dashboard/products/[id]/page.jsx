"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../ui/dashboard/products/singleProduct/singleProduct.module.css";
import DepartmentSelector from "../../../ui/dashboard/department-selector/department-selector";
import { updateProduct } from "../../../lib/actions";

const SingleProductPage = ({ params }) => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [product, setProduct] = useState([]);
  const { id } = params;

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []); // Refetch if query or page changes

  useEffect(() => {
    if (product.departments) {
      setSelectedDepartments(product?.departments);
    }
  }, [product]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/noavatar.png"} alt="" fill />
        </div>
        {product.title}
      </div> */}
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product._id} />
          <input
            type="hidden"
            name="departments"
            value={JSON.stringify(selectedDepartments)}
          />
          <label>Ürün Kodu</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.code}
            name="code"
          />
          <label>Ürün</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.product}
            name="product"
          />
          <label>Ürün Model</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.productModel}
            name="productModel"
          />
          <label>Marka</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.brand}
            name="brand"
          />
          <label>Model</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.model}
            name="model"
          />
          <DepartmentSelector
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
          />
          <button className={styles.button}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
