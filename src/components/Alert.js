import React, { useEffect } from "react";

const Alert = ({ type, msg, setAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 1500);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div>
      <p className={`alert ${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
