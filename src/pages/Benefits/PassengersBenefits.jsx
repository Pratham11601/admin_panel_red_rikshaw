import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import axios from 'axios';
import ApiConfig from '../../Consants/ApiConfig';

// Modal Component
const Modal = ({ title, children, onClose }) => (
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

function PassengersBenefits() {
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'

  // Fetch benefits from API on component mount
  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get(ApiConfig.getBenefitsEndpont());
        if (response.data.status === 1 && Array.isArray(response.data.data)) {
          setBenefits(response.data.data.filter((benefit) => benefit.Category === 'passenger'));
        } else {
          console.error("Fetched benefits are not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching benefits:", error);
      }
    };
    fetchBenefits();
  }, []);

  // Open modal for adding new benefit
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
  const handleAddBenefit = async () => {
    if (newBenefit.trim()) {
      try {
        const response = await axios.post(ApiConfig.postBenefitsEndpont(), {
          text: newBenefit,
          Category: 'passenger',
        });
        if (response.data.status === 1 && response.data.data) {
          setBenefits((prevBenefits) => [...prevBenefits, response.data.data]);
          setNewBenefit('');
          setIsModalOpen(false);
        } else {
          console.error('Failed to add benefit:', response.data.message || 'No message provided');
        }
      } catch (error) {
        console.error('Error adding benefit:', error.response?.data || error.message);
      }
    } else {
      console.error("New benefit text is empty");
    }
  };

  // Save edited benefit
  const handleSaveEdit = async () => {
    const updatedBenefit = {
      _id: benefits[editingIndex]._id,
      text: editingBenefit,
      Category: 'passenger',
    };

    try {
      const response = await axios.put(ApiConfig.putBenefitsEndpont(updatedBenefit._id), updatedBenefit);
      if (response.data.status === 1) {
        setBenefits((prevBenefits) =>
          prevBenefits.map((benefit, index) => (index === editingIndex ? updatedBenefit : benefit))
        );
        setEditingIndex(null);
        setEditingBenefit('');
        setIsModalOpen(false);
      } else {
        console.error('Failed to save changes:', response.data.message);
      }
    } catch (error) {
      console.error("Error saving edited benefit:", error);
    }
  };

  // Delete benefit
  const handleDeleteBenefit = async (index) => {
    const benefitId = benefits[index]._id;
    try {
      const response = await axios.delete(ApiConfig.deleteBenefitsEndpont(benefitId));
      if (response.data.status === 1) {
        setBenefits((prevBenefits) => prevBenefits.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete benefit:', response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete benefit:", error);
    }
  };

  return (
    <div className="bg-white flex-1 overflow-auto relative z-10 p-4 text-black">
      <Header title="Passenger Benefits" />

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
          <p>No benefits added yet.</p>
        ) : (
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={benefit._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2">
                <span className="text-gray-700 w-full sm:w-3/4">{benefit.text}</span>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleOpenEditModal(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBenefit(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
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

export default PassengersBenefits;
