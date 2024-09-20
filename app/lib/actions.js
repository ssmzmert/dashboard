"use server";
import { revalidatePath } from "next/cache";
import { Department, Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { error } from "console";

export const addUser = async (formData) => {
  "use server";

  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassord = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassord,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create a user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  "use server";

  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update a user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  "use server";

  const { code, product, productModel, brand, model, departments } = formData;

  try {
    connectToDB();

    const newProduct = new Product({
      code,
      product,
      productModel,
      brand,
      model,
      departments,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create a product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  "use server";

  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update a product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const addDepartment = async (formData) => {
  "use server";

  const { name, isActive } = Object.fromEntries(formData);
  console.log(name, isActive);
  try {
    connectToDB();

    const newDepartment = new Department({
      name,
      isActive,
    });

    await newDepartment.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create a department!");
  }

  revalidatePath("/dashboard/departments");
  redirect("/dashboard/departments");
};

export const updateDepartment = async (formData) => {
  "use server";

  const { id, name, isActive } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      name,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Department.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update a department!");
  }

  revalidatePath("/dashboard/departments");
  redirect("/dashboard/departments");
};

export const deleteDepartment = async (formData) => {
  "use server";

  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Department.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete a department!");
  }

  revalidatePath("/dashboard/departments");
};

export const deleteProduct = async (formData) => {
  "use server";

  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete a product!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteUser = async (formData) => {
  "use server";

  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete a user!");
  }

  revalidatePath("/dashboard/users");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
