import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/product-list", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product-delete/${id}`, {
      method: "DELETE",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="py-10 w-3/4 mx-auto ">
      <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-customSemiBold text-black">
            Product List
            </h1>
            <Link to="/add"
              className="bg-blue-400 text-white pt-2 pb-2.5 px-5 rounded-md text-base"
              
            >
              Add New Product
            </Link>
          </div>
      <input
        className="border border-blue-300 rounded-md py-2.5 px-5 w-1/2 my-5 text-sm text-black"
        onChange={searchHandle}
        placeholder="Search"
      />

      <table className="w-full border-collapse border border-blue-200">
        <thead>
          <tr>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Sr.No
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Image
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Name
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Price
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Category
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Company
            </th>
            <th className="p-3 text-center text-lg text-black border border-blue-200">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  {index + 1}
                </td>
                <td className="p-3 w-[15%] text-center text-lg text-black border border-blue-200">
                  <span className="w-full block"><img src={"http://localhost:5000/"+item.image} alt="" /></span>
                </td>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  {item.name}
                </td>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  {item.price}
                </td>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  {item.category}
                </td>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  {item.company}
                </td>
                <td className="p-3 text-center text-lg text-black border border-blue-200">
                  <div className="flex gap-1 justify-between">
                    <span
                      className="text-sm cursor-pointer text-red-600"
                      onClick={() => deleteProduct(item._id)}
                    >
                      Delete
                    </span>
                    <Link
                      to={"/update/" + item._id}
                      className="text-sm cursor-pointer text-blue-600"
                    >
                      Update
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <h1 className="text-black text-xl text-center my-10">
                  Product is not found.
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
