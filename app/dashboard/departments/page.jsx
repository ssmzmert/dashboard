"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Image from "next/image";
import { deleteDepartment } from "../../lib/actions";
import { MdDoDisturbOn, MdDone } from "react-icons/md";

const DepartmentsPage = ({ searchParams }) => {
  const [departments, setDepartments] = useState([]);
  const [count, setCount] = useState(0);
  const [sseConnection, setSSEConnection] = useState(null);

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`/api/departments?q=${q}&page=${page}`);
      const data = await response.json();
      setDepartments(data.departments);
      setCount(data.count);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, [q, page]); // Refetch if query or page changes

  const listenToSSEUpdates = useCallback(() => {
    console.log("listenToSSEUpdates func");
    const eventSource = new EventSource("/api/departments/sse");
    eventSource.onopen = () => {
      console.log("SSE connection opened.");
      // Save the SSE connection reference in the state
    };
    eventSource.onmessage = (event) => {
      const data = event.data;
      console.log("Received SSE Update:", data);
      fetchDepartments();
    };
    eventSource.onerror = (event) => {
      console.error("SSE Error:", event);
      // Handle the SSE error here
    };
    setSSEConnection(eventSource);
    return eventSource;
  }, []);

  useEffect(() => {
    fetchDepartments();
    listenToSSEUpdates();
    return () => {
      if (sseConnection) {
        sseConnection.close();
      }
    };
  }, [listenToSSEUpdates]);
  // Add "beforeunload" event listener to close SSE connection when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.dir(sseConnection);
      if (sseConnection) {
        console.info("Closing SSE connection before unloading the page.");
        sseConnection.close();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sseConnection]);

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
            <tr key={department._id}>
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
              <td>{department.createdAt?.toString().slice(0, 10)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/departments/${department._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteDepartment}>
                    <input type="hidden" value={department._id} name="id" />
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
