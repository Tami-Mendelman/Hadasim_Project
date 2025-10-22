import RegisterForm from "../components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section
      style={{
        maxWidth: 560,
        margin: "2rem auto",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>הרשמה</h1>
      <RegisterForm />
    </section>
  );
}
