"use client";

import { useMemo, useState } from "react";
import styles from "./RegisterForm.module.css";

type Form = {
  fullName: string;
  phone: string;
  email: string;
  birthdate: string; 
};

type Errors = Partial<Record<keyof Form, string>>;

const isAdult = (birthdate: string) => {
  if (!birthdate) return false;
  const today = new Date();
  const dob = new Date(birthdate);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age >= 18;
};

const validateFullName = (val: string) => {
  const name = val.trim().replace(/\s+/g, " ");
  const parts = name.split(" ").filter(Boolean);
  if (parts.length < 2) return "יש להזין שם פרטי ושם משפחה (לפחות שתי מילים).";
  if (parts.some((p) => /^\d/.test(p))) return "אסור שמילה בשם תתחיל במספר.";
  return "";
};

const validatePhone = (val: string) => {
  if (!val) return "יש להזין מספר טלפון.";
  if (!/^\d+$/.test(val)) return "הטלפון חייב להכיל ספרות בלבד.";
  return "";
};

const validateEmail = (val: string) => {
  if (!val) return "יש להזין כתובת אימייל.";
  // תבנית פשוטה בסגנון xxxxx@xxxxx.XXX
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(val))
    return "כתובת אימייל לא תקינה (example@domain.com).";
  return "";
};

const validateBirthdate = (val: string) => {
  if (!val) return "יש לבחור תאריך לידה.";
  if (!isAdult(val)) return "יש להיות מעל גיל 18.";
  return "";
};

export default function RegisterForm() {
  const [form, setForm] = useState<Form>({
    fullName: "",
    phone: "",
    email: "",
    birthdate: "",
  });
  const [submittedOk, setSubmittedOk] = useState(false);

  const errors: Errors = useMemo(() => {
    return {
      fullName: validateFullName(form.fullName),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
      birthdate: validateBirthdate(form.birthdate),
    };
  }, [form]);

  const isValid = useMemo(
    () => Object.values(errors).every((e) => !e),
    [errors]
  );

  const onChange =
    (name: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmittedOk(false);
      setForm((f) => ({ ...f, [name]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmittedOk(true)
  };

  return (
    <form className={styles.form} dir="rtl" onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>שם מלא</span>
          <input
            className={styles.input}
            type="text"
            name="fullName"
            placeholder="לדוגמה: תמר לוי"
            value={form.fullName}
            onChange={onChange("fullName")}
            aria-invalid={!!errors.fullName}
            aria-describedby="err-fullname"
            autoComplete="name"
          />
          {errors.fullName && (
            <span id="err-fullname" className={styles.error}>
              {errors.fullName}
            </span>
          )}
        </label>

        <label className={styles.field}>
          <span>טלפון</span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            placeholder="לדוגמה: 0501234567"
            value={form.phone}
            onChange={onChange("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby="err-phone"
            inputMode="numeric"
            pattern="\d*"
          />
          {errors.phone && (
            <span id="err-phone" className={styles.error}>
              {errors.phone}
            </span>
          )}
        </label>
      </div>

      <label className={styles.field}>
        <span>אימייל</span>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange("email")}
          aria-invalid={!!errors.email}
          aria-describedby="err-email"
          autoComplete="email"
        />
        {errors.email && (
          <span id="err-email" className={styles.error}>
            {errors.email}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span>תאריך לידה</span>
        <input
          className={styles.input}
          type="date"
          name="birthdate"
          value={form.birthdate}
          onChange={onChange("birthdate")}
          aria-invalid={!!errors.birthdate}
          aria-describedby="err-birthdate"
        />
        {errors.birthdate && (
          <span id="err-birthdate" className={styles.error}>
            {errors.birthdate}
          </span>
        )}
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={!isValid}>
          הרשמה
        </button>
        {submittedOk && (
          <div className={styles.success}>נרשמת בהצלחה 🎉</div>
        )}
      </div>
    </form>
  );
}
