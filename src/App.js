import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListItem from "./components/ListItem";
import Alert from "./components/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editId, setEditId] = useState(null);

  const submitData = (e) => {
    // เพื่อไม่ให้ browser reload หรือ refresh
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "กรุณาป้อนข้อมูล", type: "error" });
    } else if (checkEditItem && name) {
      // update data
      const updateItem = list.map((item) => {
        if (item.id === editId) {
          return { ...item, inputForm: name };
        }
        return item;
      });
      setList(updateItem);
      setName("");
      setCheckEditItem(false);
      setEditId(null);
      setAlert({ show: true, msg: "แก้ไขข้อมูลเรียบร้อย !!", type: "success" });
    } else {
      const newItem = {
        id: uuidv4(),
        inputForm: name,
      };
      setList([...list, newItem]);
      // clear form
      setName("");
      setAlert({ show: true, msg: "บันทึกข้อมูลเรียบร้อย", type: "success" });
    }
  };

  const removeItem = (id) => {
    const result = list.filter((item) => item.id !== id);
    setList(result);
    setAlert({ show: true, msg: "ลบข้อมูลเรียบร้อย !!", type: "error" });
  };

  const editItem = (id) => {
    setCheckEditItem(true);
    setEditId(id);
    // find ได้ obj แต่ filter ได้ array
    const editItem = list.find((item) => item.id === id);
    setName(editItem.inputForm);
  };

  return (
    <section className="container">
      <h1>TodoList App</h1>
      {/* props = {...alert} */}
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="form-group" onSubmit={submitData}>
        <div className="form-control">
          <input
            type="text"
            className="text-input"
            onChange={(e) => setName(e.target.value)}
            //  data binding
            value={name}
          />
          <button type="submit" className="submit-btn">
            {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((data, index) => {
          return (
            <ListItem
              key={index}
              {...data}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </section>
    </section>
  );
}

export default App;
