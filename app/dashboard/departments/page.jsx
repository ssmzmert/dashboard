import React from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchDepartments } from "../../lib/data";
import Image from "next/image";
import { deleteDepartment } from "../../lib/actions";
import { MdDoDisturbOn, MdDone } from "react-icons/md";

const DepartmentsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, departments } = await fetchDepartments(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a Department..."} />
        <Link href="/dashboard/departments/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Departman</td>
            <td>Status</td>
            <td>Created At</td>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={department.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {department.name}
                </div>
              </td>
              <td>
                {department.isActive ? (
                  <MdDone color="green" size="20px" />
                ) : (
                  <MdDoDisturbOn color="red" size="20px" />
                )}
              </td>
              <td>{department.createdAt?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/departments/${department.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteDepartment}>
                    <input type="hidden" value={department.id} name="id" />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default DepartmentsPage;
