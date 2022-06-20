import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ListItem = ({ id, inputForm, removeItem, editItem }) => {
  return (
    <div className="list-item">
      <p className="inputForm">{inputForm}</p>
      <div className="btn-container">
        <BiEdit onClick={() => editItem(id)} className="btn" />
        <RiDeleteBin6Line onClick={() => removeItem(id)} className="btn" />
      </div>
    </div>
  );
};

export default ListItem;
