import React from "react";
import styles from "./department-selector.module.css";
import {
  MdArrowCircleUp,
  MdArrowCircleDown,
  MdOutlineCancel,
} from "react-icons/md";
import { departmentList } from "../../../lib/statics";

const DepartmentSelector = ({
  selectedDepartments,
  setSelectedDepartments,
}) => {
  const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

  const handleSelectDepartment = (department) => {
    setSelectedDepartments([
      ...selectedDepartments,
      {
        ...department,
        selectionId: generateUniqueId(),
        subcategories: [],
        newKey: "",
        newValue: "",
      },
    ]);
  };

  const handleMoveDepartment = (index, direction) => {
    const newDepartments = [...selectedDepartments];
    if (direction === "up" && index > 0) {
      [newDepartments[index], newDepartments[index - 1]] = [
        newDepartments[index - 1],
        newDepartments[index],
      ];
    } else if (direction === "down" && index < newDepartments.length - 1) {
      [newDepartments[index], newDepartments[index + 1]] = [
        newDepartments[index + 1],
        newDepartments[index],
      ];
    }
    setSelectedDepartments(newDepartments);
  };

  const handleSubcategoryInputChange = (selectionId, key, value) => {
    setSelectedDepartments((prev) =>
      prev.map((dept) =>
        dept.selectionId === selectionId
          ? { ...dept, newKey: key, newValue: value }
          : dept
      )
    );
  };

  const handleAddSubcategory = (selectionId) => {
    setSelectedDepartments((prev) =>
      prev.map((dept) =>
        dept.selectionId === selectionId
          ? {
              ...dept,
              subcategories: [
                ...dept.subcategories,
                { key: dept.newKey, value: dept.newValue },
              ],
              newKey: "",
              newValue: "",
            }
          : dept
      )
    );
  };

  const handleDeselectDepartment = (index) => {
    setSelectedDepartments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.departmentSelector}>
      <h2>Departman Seç</h2>
      <br />
      <ul className={styles.departmentList}>
        {departmentList.map((department) => (
          <li key={department.id}>
            {department.name}

            <button
              type="button"
              className={styles.selectBtn}
              onClick={() => handleSelectDepartment(department)}
            >
              Seç
            </button>
          </li>
        ))}
      </ul>

      {selectedDepartments.length > 0 && (
        <>
          <h2>Seçilmiş Departmanlar</h2>
          <br />
          <ul className={styles.selectedDepartmentList}>
            {selectedDepartments.map((department, index) => (
              <li
                key={department.selectionId}
                className={styles.selectedDepartment}
              >
                <span>{department.name}</span>
                <button
                  type="button"
                  className={styles.moveBtn}
                  onClick={() => handleMoveDepartment(index, "up")}
                >
                  <MdArrowCircleUp size={20} />
                </button>
                <button
                  type="button"
                  className={styles.moveBtn}
                  onClick={() => handleMoveDepartment(index, "down")}
                >
                  <MdArrowCircleDown size={20} />
                </button>
                <button
                  type="button"
                  className={styles.deselectBtn}
                  onClick={() => handleDeselectDepartment(index)}
                >
                  <MdOutlineCancel size={20} />
                </button>
                <div className={styles.subcategories}>
                  {/* <h4>Subcategories</h4> */}
                  <div>
                    <input
                      className={styles.subcategoryInput}
                      type="text"
                      placeholder="Başlık"
                      value={department.newKey}
                      onChange={(e) =>
                        handleSubcategoryInputChange(
                          department.selectionId,
                          e.target.value,
                          department.newValue
                        )
                      }
                    />
                    <input
                      className={styles.subcategoryInput}
                      type="text"
                      placeholder="Değer"
                      value={department.newValue}
                      onChange={(e) =>
                        handleSubcategoryInputChange(
                          department.selectionId,
                          department.newKey,
                          e.target.value
                        )
                      }
                    />
                    <button
                      type="button"
                      className={styles.addSubcategoryBtn}
                      onClick={() =>
                        handleAddSubcategory(department.selectionId)
                      }
                    >
                      Alt Kategori Ekle
                    </button>
                  </div>
                  <div className={styles.subcategoryLi}>
                    {department.subcategories.map((sub, i) => (
                      <div key={i}>
                        {sub.key}: {sub.value}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DepartmentSelector;
