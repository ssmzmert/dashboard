import { addDepartment } from "../../../lib/actions";
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";

const AddDepartmentPage = () => {
  return (
    <div className={styles.container}>
      <form action={addDepartment} className={styles.form}>
        <input type="text" placeholder="Departman Ismi" name="name" required />
        <select name="isActive" id="isActive">
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDepartmentPage;
