"use client";
import React, { useState } from "react";
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import { addProduct } from "../../../lib/actions";
import DepartmentSelector from "../../../ui/dashboard/department-selector/department-selector";

async function formAction(data) {
  const code = data.get("code").valueOf();
  const product = data.get("product").valueOf();
  const productModel = data.get("productModel").valueOf();
  const brand = data.get("brand").valueOf();
  const model = data.get("model").valueOf();
  const selectedDepartments = JSON.parse(data.get("selectedDepartments"));

  const dataModel = {
    code: code,
    product: product,
    productModel: productModel,
    brand: brand,
    model: model,
    departments: selectedDepartments,
  };
  addProduct(dataModel);
}

const AddProductPage = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
        <input
          type="hidden"
          name="selectedDepartments"
          value={JSON.stringify(selectedDepartments)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Ürün Kodu"
          name="code"
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Ürün"
          name="product"
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Ürün Model"
          name="productModel"
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Marka"
          name="brand"
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Model"
          name="model"
        />
        <DepartmentSelector
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
        />
        <button className={styles.button} type="submit">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
