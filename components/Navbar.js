import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <h1>Home Page</h1>
          </a>
        </Link>
        <div className={styles.navwrapper}>
          <Link href="/gallery">
            <a>Gallery</a>
          </Link>
          <Link href="/upload">
            <a>Upload</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
