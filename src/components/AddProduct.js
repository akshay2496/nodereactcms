import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [productImage, setFile] = useState('');
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    const handleAddProduct = async ()=>{

      console.warn( !name);
      if(!name || !price || !category || !company || !productImage){
        setError(true);
        return false;
      }
    
        // Add product to the database
        console.log(name, price, category, company, productImage);

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.warn(userId._id);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('userId', userId);
  // formData.append('productImage', productImage);

  // Append file input to FormData if file is being uploaded
  if (productImage) {
    formData.append('image', productImage);  // Assuming 'file' is the image file input from the form
  }

        let result = await fetch('http://localhost:5000/add-product',{
            method:'POST',
            body: formData,
            headers:{
                'Content-Type':'application/json',
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
    }

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
        {error && !name && <span className="block text-red-600 text-sm">Enter valid name.</span>}
        </div>
        <div className="mb-3">
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-md p-3 border-blue-300"
          placeholder="enter product price"
        />
        {error && !price && <span className="block text-red-600 text-sm ">Enter valid price.</span>}
        </div>
        <div className="mb-3">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-md p-3 border-blue-300 "
          placeholder="enter product category"
        />
        {error && !price && <span className="block text-red-600 text-sm ">Enter valid category.</span>}
        </div>
        <div className="mb-3">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border rounded-md p-3 border-blue-300 "
          placeholder="enter product company"
        />
         {error && !company && <span className="block text-red-600 text-sm ">Enter valid company.</span>}
         </div>
         <div className="mb-3">
         <input className="w-full border rounded-md p-3 border-blue-300 " type="file" onChange={(e) => setFile(e.target.files[0])} />  {/* Handle file input */}
         {error && !company && <span className="block text-red-600 text-sm ">Add image.</span>}
         </div>
        <button
          type="submit"
          onClick={handleAddProduct}
          className="text-center px-20 py-2 bg-blue-700 text-white rounded-md mx-auto block"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
