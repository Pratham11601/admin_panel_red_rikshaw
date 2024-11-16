import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import ApiConfig from "../Consants/ApiConfig";

const Terms = () => {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('');
    const [currentTerm, setCurrentTerm] = useState(null);
    const [formData, setFormData] = useState({ title: '', subtitle: '', content: '' });

    useEffect(() => {
        fetch(ApiConfig.getTermsAndConditionEndpont())
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    setTerms(data.data);
                } else {
                    setError(data.message || 'Failed to fetch terms and conditions');
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

    const handleEditClick = (term) => {
        setFormType('edit');
        setCurrentTerm(term);
        setFormData({ title: term.title, subtitle: term.subtitle, content: term.content });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({ title: '', subtitle: '', content: '' });
        setCurrentTerm(null);
    };

    const handleSave = () => {
        if (!formData.title && !formData.subtitle && !formData.content) {
            alert('Please fill at least one field: title, subtitle, or content');
            return;
        }

        const endpoint = formType === 'add'
            ? ApiConfig.postTermsAndConditionEndpoint()
            : ApiConfig.putTermsAndConditionEndpoint(currentTerm._id);

        fetch(endpoint, {
            method: formType === 'add' ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    if (formType === 'add') {
                        setTerms([...terms, data.data]);
                    } else {
                        const updatedTerms = terms.map((term) =>
                            term._id === currentTerm._id ? { ...term, ...formData, updatedAt: new Date() } : term
                        );
                        setTerms(updatedTerms);
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
        fetch(ApiConfig.deleteTermsAndConditionEndpoint(id), {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 1) {
                    setTerms(terms.filter((term) => term._id !== id));
                } else {
                    setError(data.message || 'Failed to delete the term');
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
            <Header title={"Terms and Conditions"} />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md mb-4' onClick={handleAddClick}>Add</button>
                <ul className='space-y-4'>
                    {terms.map((term) => (
                        <li key={term._id} className='bg-white p-4 rounded-lg shadow-md text-black bordr-b border-red-400'>
                            {/* <strong>Serial Number: {term.sr_no}</strong><br /> */}
                            <span>Title: {term.title}</span><br />
                            <span>Subtitle: {term.subtitle}</span><br />
                            <span>Content: {term.content}</span><br />
                            <small>Created At: {new Date(term.createdAt).toLocaleString()}</small><br />
                            {term.updatedAt && (
                                <small>Updated At: {new Date(term.updatedAt).toLocaleString()}</small>
                            )}
                            <div className='mt-4 flex justify-end space-x-2'>
                                <button className='bg-yellow-500 text-white px-3 py-1 rounded-md' onClick={() => handleEditClick(term)}>Edit</button>
                                <button className='bg-red-500 text-white px-3 py-1 rounded-md' onClick={() => handleDeleteClick(term._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>

            {showForm && (
                <div className='fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50'>
                    <div className='bg-white rounded-lg p-6 w-11/12 md:w-1/2'>
                        <h3 className='text-lg font-semibold mb-4'>{formType === 'add' ? 'Add New Term' : 'Edit Term'}</h3>
                        <label className='block mb-1'>Title:</label>
                        <input
                            type='text'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder='Enter title'
                            className='border border-gray-300 rounded-md w-full p-2 mb-4'
                        />
                        <label className='block mb-1'>Subtitle:</label>
                        <input
                            type='text'
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder='Enter subtitle'
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

export default Terms;
