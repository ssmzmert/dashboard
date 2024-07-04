import LoginForm from "../ui/login/loginForm/loginForm";
import styles from "../ui/login/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
