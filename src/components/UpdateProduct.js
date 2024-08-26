import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [productImage, setFile] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, [params.id]);

  const getProductDetails = async () => {
    let result = await fetch(
      `http://localhost:5000/product-update/${params.id}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      }
    );
    result = await result.json();
    // console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    setCompany(result.company);
    setFile(null);
  };

  const handleUpdateProduct = async () => {
    console.warn(name, price, category, company);
  
 
      let response = await fetch(
        `http://localhost:5000/product-update/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          },
          body: JSON.stringify({
            name,
            price,
            category,
            company,
          }),
        }
      );
      
      let result = await response.json(); // Use let here to allow reassignment
      console.warn(result);
      navigate("/");
   
  };

  return (
    <div className="mt-20">
      <h3 className="text-center text-3xl font-customSemiBold">Add Product</h3>
      <div className="w-2/5 mx-auto shadow rounded-md p-10 mt-5">
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300 "
            placeholder="enter product name"
          />
          {/* {error && !name && <span className="block text-red-600 text-sm">Enter valid name.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="enter product price"
          />
          {/* {error && !price && <span className="block text-red-600 text-sm ">Enter valid price.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300 "
            placeholder="enter product category"
          />
          {/* {error && !price && <span className="block text-red-600 text-sm ">Enter valid category.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300 "
            placeholder="enter product company"
          />
          {/* {error && !company && <span className="block text-red-600 text-sm ">Enter valid company.</span>} */}
        </div>
        <div className="mb-3">
          <input
            className="w-full border rounded-md p-3 border-blue-300"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* {error && !productImage && <span className="block text-red-600 text-sm">Please upload an image.</span>} */}
        </div>
        <button
          type="submit"
          onClick={handleUpdateProduct}
          className="text-center px-20 py-2 bg-blue-700 text-white rounded-md mx-auto block"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
