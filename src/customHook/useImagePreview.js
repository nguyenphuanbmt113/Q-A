import { useEffect, useState } from "react";

const useFilePreview = (file) => {
  const [imgSrc, setImgSrc] = useState(null);
  const handleClose = () => {
    setImgSrc(null);
  };
  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);
      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    } else {
      setImgSrc(null);
    }
  }, [file]);
  return [imgSrc, handleClose];
};
export default useFilePreview;
