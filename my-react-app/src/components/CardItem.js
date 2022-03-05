import { useEffect } from "react";

const CardItem = ({ label, value, labelCss = "", valueCss = "" }) => {
  useEffect(() => {}, []);
  return (
    <div>
      <span className={`label ${labelCss}`}>{`${label}:`}</span>
      <span className={`label-value ml-2 ${valueCss}`}>{value}</span>
    </div>
  );
};

export default CardItem;
