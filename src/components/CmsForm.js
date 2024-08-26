import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CmsForm({ existingPolicy, onSubmit }) {
  const [title, setTitle] = useState(existingPolicy?.title || "");
  const [body, setBody] = useState(existingPolicy?.body || "");
  const [type, setType] = useState(existingPolicy?.type || "");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null); // Clear any previous errors

      if (existingPolicy) {
        // Update policy
        await axios.put(`http://localhost:5000/cms/type/${type}`, {
          title,
          body,
        });
      } else {
        // Add new policy
        await axios.post("http://localhost:5000/cms", { title, body, type });
      }
      onSubmit(); // Notify parent to close form and refresh list
    } catch (error) {
      setError("Error saving policy. Please try again.");
      console.error("Error saving policy:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex justify-between items-center mb-5 gap-5">
        <h1 className="text-black font-semibold text-xl">
          {existingPolicy ? "Update" : "Create"}
        </h1>
        <button
          type="submit"
          className="bg-blue-400 text-white pt-2 pb-2.5 px-5 rounded-md text-base"
        >
          {existingPolicy ? "Update" : "Create"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-2 mb-5 gap-5">
        <div>
          <label className="block text-black text-base">Title:</label>
          <input
            className="border border-gray-300 p-3 text-black text-base w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label className="block text-black text-base">Type:</label>
          <input
            className="border border-gray-300 p-3 w-full text-black text-base"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
            required
            disabled={!!existingPolicy}
          />
        </div>
      </div>

      <div>
        {/* <label>Body:</label> */}
        <ReactQuill
          className="h-full text-black text-base"
          value={body}
          onChange={setBody}
          placeholder="Write your policy here..."
        />
      </div>
    </form>
  );
}

export default CmsForm;
