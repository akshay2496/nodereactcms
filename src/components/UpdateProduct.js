import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [productImage, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // State for image preview
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductDetails();
  }, [params.id]);

  useEffect(() => {
    if (productImage) {
      const objectUrl = URL.createObjectURL(productImage);
      setImagePreview(objectUrl);

      // Clean up the object URL when the component unmounts or image changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [productImage]);

  const getProductDetails = async () => {
    let result = await fetch(
      `http://localhost:5000/product-update/${params.id}`, {
        headers: {
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
    setFile(null);
    setImagePreview("http://localhost:5000/"+result.image); // Reset image preview when loading new product details
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("company", company);
  
    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      let response = await fetch(
        `http://localhost:5000/product-update/${params.id}`,
        {
          method: "PUT",
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
  
      let result = await response.json();
      console.warn(result);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="mt-20">
      <h3 className="text-center text-3xl font-customSemiBold">Update Product</h3>
      <div className="w-2/5 mx-auto shadow rounded-md p-10 mt-5">
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product name"
          />
          {/* {error && !name && <span className="block text-red-600 text-sm">Enter valid name.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product price"
          />
          {/* {error && !price && <span className="block text-red-600 text-sm">Enter valid price.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product category"
          />
          {/* {error && !category && <span className="block text-red-600 text-sm">Enter valid category.</span>} */}
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-md p-3 border-blue-300"
            placeholder="Enter product company"
          />
          {/* {error && !company && <span className="block text-red-600 text-sm">Enter valid company.</span>} */}
        </div>
        <div className="mb-3">
          <input
            className="w-full border rounded-md p-3 border-blue-300"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* {error && !productImage && <span className="block text-red-600 text-sm">Please upload an image.</span>} */}
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto border rounded-md"
              />
            </div>
          )}
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
