import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import ApiConfig from "../Consants/ApiConfig";

const Privacy = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('');
    const [currentPolicy, setCurrentPolicy] = useState(null);
    const [formData, setFormData] = useState({ title: '', content: '' });

    useEffect(() => {
        fetch(ApiConfig.getPrivacyPolicyEndpoint())
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    setPolicies(data.data);
                } else {
                    setError(data.message || 'Failed to fetch privacy policies');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching data: ' + error.message);
                setLoading(false);
            });
    }, []);

    const handleAddClick = () => {
        setFormType('add');
        setShowForm(true);
    };

    const handleEditClick = (policy) => {
        setFormType('edit');
        setCurrentPolicy(policy);
        setFormData({ title: policy.title, content: policy.content });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({ title: '', content: '' });
        setCurrentPolicy(null);
    };

    const handleSave = () => {
        if (!formData.title && !formData.content) {
            alert('Please fill at least one field: title or content');
            return;
        }

        const endpoint = formType === 'add'
            ? ApiConfig.postPrivacyPolicyEndpoint()
            : ApiConfig.putPrivacyPolicyEndpoint(currentPolicy._id);

        fetch(endpoint, {
            method: formType === 'add' ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    if (formType === 'add') {
                        setPolicies([...policies, data.data]);
                    } else {
                        const updatedPolicies = policies.map((policy) =>
                            policy._id === currentPolicy._id ? { ...policy, ...formData, updatedAt: new Date() } : policy
                        );
                        setPolicies(updatedPolicies);
                    }
                    handleCancel();
                } else {
                    setError(data.message || 'Failed to save changes');
                }
            })
            .catch((error) => {
                setError('Error saving data: ' + error.message);
            });
    };

    const handleDeleteClick = (id) => {
        fetch(ApiConfig.deletePrivacyPolicyEndpoint(id), {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    setPolicies(policies.filter((policy) => policy._id !== id));
                } else {
                    setError(data.message || 'Failed to delete the policy');
                }
            })
            .catch((error) => {
                setError('Error deleting data: ' + error.message);
            });
    };

    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    if (error) {
        return <div className='text-center text-red-500'>Error: {error}</div>;
    }

    return (
        <div className='flex-1 relative z-10 overflow-auto bg-white'>
            <Header title={"Privacy Policies"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4' onClick={handleAddClick}>Add</button>
                <ul className='space-y-4'>
                    {policies.map((policy) => (
                        <li key={policy._id} className='bg-white p-4 rounded-lg shadow-md text-black'>
                            {/* <strong>Serial Number: {policy.sr_no}</strong><br /> */}
                            <span>Title: {policy.title}</span><br />
                            <span>Content: {policy.content}</span><br />
                            <small>Created At: {new Date(policy.createdAt).toLocaleString()}</small><br />
                            {policy.updatedAt && (
                                <small>Updated At: {new Date(policy.updatedAt).toLocaleString()}</small>
                            )}
                            <div className='mt-4 flex justify-end space-x-2'>
                                <button className='bg-yellow-500 text-white px-3 py-1 rounded-md' onClick={() => handleEditClick(policy)}>Edit</button>
                                <button className='bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => handleDeleteClick(policy._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>

            {showForm && (
                <div className='fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50'>
                    <div className='bg-white rounded-lg p-6 w-11/12 md:w-1/2'>
                        <h3 className='text-lg font-semibold mb-4'>{formType === 'add' ? 'Add New Policy' : 'Edit Policy'}</h3>
                        <label className='block mb-1'>Title:</label>
                        <input
                            type='text'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder='Enter title'
                            className='border border-gray-300 rounded-md w-full p-2 mb-4'
                        />
                        <label className='block mb-1'>Content:</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder='Enter content'
                            className='border border-gray-300 rounded-md w-full p-2 mb-4'
                        />
                        <div className='flex justify-end space-x-2'>
                            <button onClick={handleCancel} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'>Cancel</button>
                            <button onClick={handleSave} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Privacy;
