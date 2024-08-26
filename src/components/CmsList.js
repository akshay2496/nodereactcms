import React, { useEffect, useState } from "react";
import axios from "axios";
import CmsForm from "./CmsForm";

function CmsList() {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/policies");
      setPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleAddNewPolicy = () => {
    setSelectedPolicy(null); // No policy selected, so form is for new policy
    setShowForm(true); // Show form
  };

  const handleUpdatePolicy = (policy) => {
    setSelectedPolicy(policy); // Select the policy to be updated
    setShowForm(true); // Show form
  };

  const handleFormSubmit = () => {
    setShowForm(false); // Hide form after submission
    fetchPolicies(); // Refresh the list after submission
  };

  return (
    <div className="mt-20 px-40">
      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-customSemiBold text-black">
              Policies
            </h1>
            <button
              className="bg-blue-400 text-white pt-2 pb-2.5 px-5 rounded-md text-base"
              onClick={handleAddNewPolicy}
            >
              Add New
            </button>
          </div>
          {policies.map((policy) => (
            <ul
              key={policy._id}
              className="flex items-center border border-gray-200"
            >
              <li className="border-e border-gray-200 w-[90%] p-3">
                <h2 className="text-black font-customBold text-lg">
                  {policy.title} ({policy.type})
                </h2>
                <p className="text-black text-sm font-customMedium">
                  {policy.body ? (
                    <span dangerouslySetInnerHTML={{ __html: policy.body }} />
                  ) : (
                    "No content available."
                  )}
                </p>
              </li>
              <li className="w-[10%] text-center p-3">
                <button
                  className="bg-blue-400 text-white pt-1 pb-1.5 px-2 rounded-md text-sm"
                  onClick={() => handleUpdatePolicy(policy)}
                >
                  Update
                </button>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <CmsForm existingPolicy={selectedPolicy} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default CmsList;
