import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [productImage, setFile] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company || !productImage) {
      setError(true);
      return;
    }

    // Add product to the database
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('company', company);
    formData.append('userId', userId);
    if (productImage) {
      formData.append('productImage', productImage); // Handle image file
    }

    try {
      const result = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: formData,
        headers: {
          // No 'Content-Type' header for FormData
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });

      if (result.ok) {
        // Reset form fields after successful submission
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        setFile(null);

        // Redirect to another page (e.g., product list)
        navigate('/');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product name"
          />
          {error && !name && <span className="block text-red-600 text-sm">Enter a valid name.</span>}
        </div>
        <div className="mb-3">
          <input
            type="number" // Improved input type for price
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product price"
          />
          {error && !price && <span className="block text-red-600 text-sm">Enter a valid price.</span>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product category"
          />
          {error && !category && <span className="block text-red-600 text-sm">Enter a valid category.</span>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product company"
          />
          {error && !company && <span className="block text-red-600 text-sm">Enter a valid company.</span>}
        </div>
        <div className="mb-3">
          <input
            className="w-full border rounded-md p-3 border-blue-300"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {error && !productImage && <span className="block text-red-600 text-sm">Please upload an image.</span>}
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
