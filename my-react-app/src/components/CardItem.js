import { useEffect } from "react";

const CardItem = ({
  label,
  value,
  labelCss = "",
  valueCss = "",
  handleClick,
}) => {
  useEffect(() => {}, []);
  return (
    <div>
      <span className={`label ${labelCss}`}>{`${label}:`}</span>
      <span
        className={`label-value ml-2 ${valueCss}`}
        onClick={(e) => {
          e.preventDefault();
          if (handleClick) {
            handleClick();
          }
        }}
      >
        {value}
      </span>
    </div>
  );
};

export default CardItem;
