import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTop() {
  // otomatis scroll atas apabila pindah halaman
  const { pathname } = useLocation();
  useEffect(() => {
    // scroll atas
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
