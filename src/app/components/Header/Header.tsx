"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); 

  const isActive = (href: string) =>
    pathname === href ? `${styles.link} ${styles.active}` : styles.link;

  const toggle = () => setOpen((v) => !v);
  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header} dir="rtl">
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/images/Hadasim_logo_-_header.webp"
              alt="לוגו האתר"
              width={150}
              height={150}
              className={styles.logoImage}
              priority
            />
            <span className={styles.siteName}>ShopProject</span>
          </Link>
        </div>
        <button
          className={styles.burger}
          aria-label="פתח תפריט"
          aria-expanded={open}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
          <Link href="/" className={isActive("/")} onClick={closeMenu}>
            דף הבית
          </Link>
          <Link href="/catalog" className={isActive("/catalog")} onClick={closeMenu}>
            קטלוג
          </Link>
          <Link href="/cart" className={isActive("/cart")} onClick={closeMenu}>
            סל קניות
          </Link>
          <Link href="/register" className={isActive("/register")} onClick={closeMenu}>
            הרשמה
          </Link>
        </nav>
      </div>
    </header>
  );
}
