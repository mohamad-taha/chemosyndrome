import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./Form.css";

const Form = () => {
  const { products, setProducts, update, setUpdate } = useContext(Context);
  const [data, setData] = useState({ name: "", price: "", img: "" });

  const addProduct = (e, newProduct) => {
    e.preventDefault();
    newProduct = {
      id: products?.length + 1 || 1,
      name: data.name,
      price: data.price,
      img: data.img,
    };
    setUpdate(!update);
    setProducts([...products, newProduct]);
    localStorage.setItem("data", JSON.stringify([...products, newProduct]));
    setData({ name: "", price: "", img: "" });
  };

  return (
    <div className="mt container">
      <form onSubmit={addProduct} className="productsForm">
        <label className="imgLabel" htmlFor="productImg">
          {data.img === "" ? (
            " اضافة صورة"
          ) : (
            <img width={100} height={100} src={data?.img} />
          )}
          <input
            required
            type="file"
            name="img"
            id="productImg"
            onChange={(event) =>
              setData({
                ...data,
                img: URL.createObjectURL(event.target.files[0]),
              })
            }
          />
        </label>
        <div>
          <label htmlFor="productName">
            <input
              value={data.name}
              required
              autoComplete="off"
              type="text"
              name="name"
              id="productName"
              placeholder="اسم المنتج"
              onChange={(event) =>
                setData({
                  ...data,
                  name: event.target.value,
                })
              }
            />
          </label>
          <label htmlFor="productPrice">
            <input
              value={data.price}
              required
              autoComplete="off"
              type="number"
              name="price"
              id="productPrice"
              placeholder="سعر المنتج"
              onChange={(event) =>
                setData({
                  ...data,
                  price: event.target.value,
                })
              }
            />
          </label>
        </div>
        <button type="submit" className="primaryBtn">
          اضافة المنتج
        </button>
      </form>
    </div>
  );
};

export default Form;
