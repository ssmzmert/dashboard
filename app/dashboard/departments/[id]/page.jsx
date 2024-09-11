import Image from "next/image";
import styles from "../../../ui/dashboard/users/singleUser/singleUser.module.css";
import { fetchDepartment } from "../../../lib/data";
import { updateDepartment } from "../../../lib/actions";

const SingleDepartmentPage = async ({ params }) => {
  const { id } = params;
  const department = await fetchDepartment(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={department.img || "/noavatar.png"} alt="" fill />
        </div>
        {department.name}
      </div>
      <div className={styles.formContainer}>
        <form action={updateDepartment} className={styles.form}>
          <input type="hidden" name="id" value={department.id} />
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={department.name}
            disabled
          />
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={department.isActive}>
              Yes
            </option>
            <option value={false} selected={!department.isActive}>
              No
            </option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleDepartmentPage;
