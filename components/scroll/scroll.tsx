import styles from "./scroll.module.scss";
import { CgArrowLongUp } from "react-icons/cg";
import cls from "classnames";
import { useEffect, useState } from "react";

const Scroll = () => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      if (window.scrollY > 200) {
        setShowBtn(true);
        console.log({ showBtn });
      } else {
        setShowBtn(false);
        console.log({ showBtn });
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showBtn && (
        <div className={styles.topToBtn} onClick={goToTop}>
          <span></span>
        </div>
      )}
    </>
  );
};

export default Scroll;