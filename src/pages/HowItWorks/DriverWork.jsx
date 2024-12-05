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

  // Fetch benefits from the API
  // useEffect(() => {
  //   const fetchBenefits = async () => {
  //     try {
  //       const userType = 'driver';
  //       const type = 'recharge';

  //       const response = await axios.get(ApiConfig.getHowItWorksEndpoint(userType, type));
  //       if (response?.data?.status === 1 && Array.isArray(response.data.benifits)) {
  //         setBenefits(response.data.benifits);
  //       } else {
  //         console.error('Unexpected response format:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error.response?.data || error.message);
  //     }
  //   };

  //   fetchBenefits();
  // }, []);


  // useEffect(() => {
  //   const fetchBenefits = async () => {
  //     try {
  //       const userType = 'Driver';
  //        const type = 'Recharge';
  //        //const type = 'Deduction';
  //       // const type = ['Recharge', 'Deduction']; 
  
  //       const endpoint = ApiConfig.getHowItWorksEndpoint(userType, type);
  //       const response = await axios.get(endpoint);
  
  //       console.log(response); // Log the API response to verify data
  
  //       if (response?.data?.status === 1 && Array.isArray(response.data.benifits)) {
  //         setBenefits(response.data.benifits);
  //       } else {
  //         console.error('Unexpected response format:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error.response?.data || error.message);
  //     }
  //   };
  
  //   fetchBenefits();
  // }, []);

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
  
  
  // useEffect(() => {
  //   const fetchBenefits = async () => {
  //     try {
  //       const userType = 'Driver';
  //       const types = ['Recharge', 'Deduction']; // Both Recharge and Deduction types
  
  //       // Creating an array of promises to fetch both Recharge and Deduction data
  //       const responses = await Promise.all(
  //         types.map((type) => {
  //           const endpoint = ApiConfig.getHowItWorksEndpoint(userType, type);
  //           return axios.get(endpoint);
  //         })
  //       );
  
  //       // Extract the data for Recharge and Deduction from the responses
  //       const rechargeData = responses[0]?.data;
  //       const deductionData = responses[1]?.data;
  
  //       console.log('Recharge Data:', rechargeData); // Log Recharge data
  //       console.log('Deduction Data:', deductionData); // Log Deduction data
  
  //       // Check if both responses are valid and update state accordingly
  //       if (
  //         rechargeData?.status === 1 && Array.isArray(rechargeData.benifits) &&
  //         deductionData?.status === 1 && Array.isArray(deductionData.benifits)
  //       ) {
  //         const filteredBenefits = {
  //           recharge: rechargeData.benifits.filter(benefit => benefit.type === 'Recharge'),
  //           deduction: deductionData.benifits.filter(benefit => benefit.type === 'Deduction'),
  //         };
  
  //         setBenefits(filteredBenefits);
  //       } else {
  //         console.error('Unexpected response format:', { rechargeData, deductionData });
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error.response?.data || error.message);
  //     }
  //   };
  
  //   fetchBenefits();
  // }, []);
  
    

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
const handleAddBenefit = () => {
  if (newBenefit.trim() && type.trim()) {
    const newBenefitData = {
      text: newBenefit,
      forWhom: 'Driver', // You can hardcode this as 'driver'
      type: type,
    };

    axios.post(ApiConfig.postHowItWorksEndpoint(), newBenefitData)
      .then((response) => {
        if (response.data.status === 1 || response.data.message === "Benefit created successfully") {
          setBenefits((prevBenefits) => [
            ...prevBenefits,
            response.data.data,
          ]);
          setNewBenefit('');
          setType(''); // No need to reset `forWhom` anymore
          setIsModalOpen(false);
        } else {
          console.error('Failed to add data:', response.data?.message || 'No message provided');
        }
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  } else {
    console.error("All fields must be filled");
  }
};

  // Save edited benefit
  const handleSaveEdit = () => {
    if (editingBenefit.trim()) {
      const updatedBenefit = { 
        _id: benefits[editingIndex]._id,
        text: editingBenefit,
        forWhom: 'Driver',
        type: benefits[editingIndex].type,
      };

      axios.put(ApiConfig.putHowItWorksEndpoint(updatedBenefit._id), updatedBenefit)
        .then((response) => {
          if (response.data.status === 1) {
            setBenefits((prevBenefits) => {
              const newBenefits = [...prevBenefits];
              newBenefits[editingIndex] = updatedBenefit;
              return newBenefits;
            });
            setEditingIndex(null);
            setEditingBenefit('');
            setIsModalOpen(false);
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

  // Delete benefit
  const handleDeleteBenefit = (index) => {
    const id = benefits[index]._id;
    axios.delete(ApiConfig.deleteHowItWorksEndpoint(id))
      .then((response) => {
        if (response.data.status === 1) {
          setBenefits(benefits.filter((_, i) => i !== index));
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
      <Header title="How It Works" />

      {/* Add Benefit Button */}
      <div className="mb-6 mt-8">
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          Add Benefit
        </button>
      </div>

      {/* List of Benefits */}
      <div>
      {benefits.length === 0 ? (
  <p>No data added yet.</p>
) : (
  <ul className="space-y-4">
    {benefits.map((benefit) => (
      <li key={benefit._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2">
        <span className="text-gray-700 w-full sm:w-3/4">{benefit.text}</span>
        {/* <span className="text-sm text-gray-500">{benefit.forWhom}</span> */}
        <span className="text-sm text-gray-500">{benefit.type}</span>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => handleOpenEditModal(index)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteBenefit(index)}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
)}

      </div>

      {/* Modal for Adding/Editing Benefit */}
      {isModalOpen && (
        <Modal
          title={modalType === 'add' ? 'Add New Benefit' : 'Edit Benefit'}
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
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="border p-2 w-full mb-2"
    >
      <option value="">Select Benefit Type</option>
      <option value="recharge">Recharge</option>
      <option value="deduction">Deduction</option>
    </select>
              <button
                onClick={handleAddBenefit}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full sm:w-[20%]"
              >
                Add Benefit
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
