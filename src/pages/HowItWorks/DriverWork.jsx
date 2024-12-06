import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import ApiConfig from '../../Consants/ApiConfig';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <h2 className="text-2xl mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 absolute top-4 right-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function DriverWork() {
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [forWhom, setForWhom] = useState('');
  const [type, setType] = useState('');
  const [editingBenefit, setEditingBenefit] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Recharge'); 
  const [deductions, setDeductions] = useState([]);
const [recharge, setRecharge] = useState([]);
const [editingBenefitId, setEditingBenefitId] = useState(null);
const [notification, setNotification] = useState(null);

  // Filter benefits based on type
  const rechargeBenefits = benefits.filter((benefit) => benefit.type === 'Recharge');
  const deductionBenefits = benefits.filter((benefit) => benefit.type === 'Deduction');

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000); // Auto-dismiss after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [notification]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const userType = 'Driver';
        const types = ['Recharge', 'Deduction']; // Filter for both Recharge and Deduction
  
        // Assuming ApiConfig.getHowItWorksEndpoint can handle dynamic types.
        const responses = await Promise.all(
          types.map(type => axios.get(ApiConfig.getHowItWorksEndpoint(userType, type)))
        );
  
        const allBenefits = responses.map(response => response.data?.benifits || []).flat(); // Combine benefits from all responses
  
        if (allBenefits.length > 0) {
          setBenefits(allBenefits); // Update state with the combined benefits
        } else {
          console.error('No benefits found in the responses.');
        }
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };
  
    fetchBenefits();
  }, []);
  

  // Open modal for adding a new benefit
  const handleOpenAddModal = () => {
    setModalType('add');
    setIsModalOpen(true);
  };

  // Open modal for editing a benefit
  const handleOpenEditModal = (index) => {
    setEditingIndex(index);
    setEditingBenefit(benefits[index].text);
    setModalType('edit');
    setIsModalOpen(true);
  };

 // Add new benefit


// const handleAddBenefit = () => {
//   if (newBenefit.trim() && forWhom.trim() && type.trim()) {
//     const newBenefitData = {
//       text: newBenefit,
//       forWhom: 'Driver', // Update this value as per your app logic
//       type: type,
//     };

//     axios.post(ApiConfig.postHowItWorksEndpoint(), newBenefitData)
//       .then((response) => {
//         if (response.data.status === 1 || response.data.message === "Benefit created successfully") {
//           setBenefits((prevBenefits) => [
//             ...prevBenefits,
//             response.data.data,
//           ]);
//           setNewBenefit('');
//           setForWhom('');
//           setType('');
//           setIsModalOpen(false);
//         } else {
//           console.error('Failed to add benefit:', response.data?.message || 'No message provided');
//         }
//       })
//       .catch((error) => {
//         console.error('Error adding benefit:', error);
//       });
//   } else {
//     console.error("All fields must be filled");
//   }
// };
const handleAddBenefit = (e) => {
  e.preventDefault();  // Prevent page reload or form submission

  // Check if all fields are filled before proceeding
  if (newBenefit.trim() && forWhom.trim() && type.trim()) {
    const newBenefitData = {
      text: newBenefit,
      forWhom: forWhom, // Ensure this dynamically uses the appropriate value
      type: type,
    };

    // Loading state to manage UI during API call
    setLoading(true); 

    axios.post(ApiConfig.postHowItWorksEndpoint(), newBenefitData)
      .then((response) => {
        setLoading(false); // Stop loading indicator

        if (response.data.status === 1 || response.data.message === "Benefit created successfully") {
          // Update the benefits state with the newly added benefit
          setBenefits((prevBenefits) => {
            const updatedBenefits = [...prevBenefits, response.data.data];
            console.log(updatedBenefits);  // Log updated benefits to check if state is updated
            return updatedBenefits;
            
          });

          // Clear input fields and close modal after successful addition
          setNewBenefit('');
          setForWhom('');
          setType('');
          setIsModalOpen(false);
          setNotification('Benefit created successfully.');
        } else {
          console.error('Failed to add benefit:', response.data?.message || 'No message provided');
          alert("Failed to add benefit: " + (response.data?.message || 'Unknown error'));
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading indicator on error
        console.error('Error adding benefit:', error);
        alert("Error adding benefit. Please try again later.");
      });

  } else {
    alert("All fields must be filled"); // Alert if fields are missing
  }
};

  // Save edited benefit
const handleSaveEdit = () => {
  if (editingBenefit.trim()) {
    // Find the benefit by its ID instead of index
    const updatedBenefit = {
      _id: benefits.find(benefit => benefit._id === editingBenefitId)._id, // Use the ID of the selected benefit
      text: editingBenefit,
      forWhom: 'Driver', // Customize as per your application logic
      type: benefits.find(benefit => benefit._id === editingBenefitId).type,
    };

    axios.put(ApiConfig.putHowItWorksEditEndpoint(updatedBenefit._id), updatedBenefit)
      .then((response) => {
        if (response.data.status === 1) {
          setBenefits((prevBenefits) => {
            const newBenefits = prevBenefits.map((benefit) => 
              benefit._id === updatedBenefit._id ? updatedBenefit : benefit
            );
            return newBenefits;
          });
          setEditingBenefit('');
          setIsModalOpen(false);
          setNotification('Benefit updated successfully.');
        } else {
          console.error('Failed to save changes:', response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error saving edited benefit:", error);
      });
  } else {
    console.error("Editing benefit text is empty");
  }
};

  const handleDeleteBenefit = (id) => {
    axios.delete(ApiConfig.deleteHowItWorksEndpoint(id)) // Deleting using the provided id
      .then((response) => {
        if (response.data.status === 1) {
          // Filter benefits based on ID, removing the deleted item
          setBenefits((prevBenefits) => prevBenefits.filter(benefit => benefit._id !== id));
          setNotification('Benefit deleted successfully.');
        } else {
          console.error('Failed to delete benefit:', response.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to delete benefit:", error);
      });
  };
  

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 p-4 text-black">
      <Header title="How It Works - Driver" />
      {notification && (
  <div className="bg-green-200 text-green-700 p-4 rounded-md mb-4 flex justify-between items-center">
    <span>{notification}</span>
    <button
      onClick={() => setNotification('')} // Clear the notification
      className="text-green-700 font-bold px-2 rounded hover:bg-green-300"
    >
      X
    </button>
  </div>
)}

       {/* How It Works Section */}
       <div className="mb-6 mt-8">
        <p className="text-gray-700">
          This section explains how the benefits system works for drivers.
          You can add new benefits by clicking the "Add" button below.
        </p>
      </div>

      {/* Add Benefit Button */}
      <div className="mb-6 mt-8 flex ">
  <button
    onClick={handleOpenAddModal}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto"
  >
    Add
  </button>
</div>

{/* List of Benefits */}
{/* Tabs */}
<div className="flex space-x-4  pb-2">
  <button
    onClick={() => setActiveTab('Recharge')}
    className={`flex-grow text-lg font-bold px-4 py-2 text-center ${activeTab === 'Recharge' ? 'text-blue-600 border-b-2 border-black-600' : 'text-gray-700'}`}
  >
    Recharge
  </button>
  <button
    onClick={() => setActiveTab('Deduction')}
    className={`flex-grow text-lg font-bold px-4 py-2 text-center ${activeTab === 'Deduction' ? 'text-red-600 border-b-2 border-black-600' : 'text-gray-700'}`}
  >
    Deduction
  </button>
</div>

      {/* Content */}
      <div className="mt-4 ">
        {activeTab === 'Recharge' && (
          <div>
            {/* <h2 className="text-lg font-semibold text-blue-600">Recharge Benefits</h2> */}
            <ul className="space-y-4 mt-4">
              {rechargeBenefits.map((benefit) => (
                <li
                  key={benefit._id}
                  className="bg-blue-50 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <span className="text-gray-700 w-full sm:w-3/4">{benefit.text}</span>
                  <div className="mt-4 flex justify-end space-x-2">
                    
                    <button
                        onClick={() => {
                          setEditingBenefitId(benefit._id); // Set the ID of the benefit you're editing
                          setEditingBenefit(benefit.text); // Set the text of the benefit
                          setIsModalOpen(true); // Open the modal to edit
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                      >
                        Edit
                      </button>
                                        
                                          <button
                        onClick={() => handleDeleteBenefit(benefit._id)}  // Pass the specific benefit ID
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'Deduction' && (
          <div>
            {/* <h2 className="text-lg font-semibold text-red-600">Deduction Benefits</h2> */}
            <ul className="space-y-4 mt-4">
              {deductionBenefits.map((benefit) => (
                <li
                  key={benefit._id}
                  className="bg-red-50 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <span className="text-gray-700 w-full sm:w-3/4">{benefit.text}</span>
                  <div className="mt-4 flex justify-end space-x-2">
                   
                    <button
                      onClick={() => {
                        setEditingBenefitId(benefit._id); // Set the ID of the benefit you're editing
                        setEditingBenefit(benefit.text); // Set the text of the benefit
                        setIsModalOpen(true); // Open the modal to edit
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                                        
                                        <button
                      onClick={() => handleDeleteBenefit(benefit._id)}  // Pass the specific benefit ID
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    

      {/* Modal for Adding/Editing Benefit */}
      {isModalOpen && (
        <Modal
          title={modalType === 'add' ? 'Add New' : 'Edit Benefit'}
          onClose={() => setIsModalOpen(false)}
        >
          {modalType === 'add' ? (
            <div>
              <textarea
                placeholder="Enter new benefit"
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                className="border p-2 w-full mb-2 h-32"
              />
                  <select
          id="forWhom"
          value={forWhom}
          onChange={(e) => setForWhom(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select For Whom</option>
          <option value="Driver">Driver</option>
        </select>
               <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 w-full mb-2"
    >
      <option value="">Select Benefit Type</option>
      <option value="Recharge">Recharge</option>
      <option value="Deduction">Deduction</option>
    </select>
              <button
                type="button"
                //onClick={handleAddBenefit}
                onClick={(e) => handleAddBenefit(e)} 
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full sm:w-[20%]"
              >
                Add
              </button>
            </div>
          ) : (
            <div>
              <textarea
                placeholder="Edit benefit"
                value={editingBenefit}
                onChange={(e) => setEditingBenefit(e.target.value)}
                className="border p-2 w-full mb-2 h-32"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full sm:w-[20%]"
              >
                Save Changes
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default DriverWork;
