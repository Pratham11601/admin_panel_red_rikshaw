import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import ApiConfig from "../Consants/ApiConfig";

const Privacy = () => {
    const [policies, setPolicies] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPolicies = async () => {
            // Mock data example
            const mockPolicies = [
                { _id: '1', sr_no: 1, title: 'Policy 1', content: 'Content for policy 1', createdAt: new Date() },
                { _id: '2', sr_no: 2, title: 'Policy 2', content: 'Content for policy 2', createdAt: new Date() }
            ];
            setPolicies(mockPolicies);
        };

        fetchPolicies();
    }, []);

    const handleSave = () => {
        console.log('Title:', title);
        console.log('Content:', content);
        setShowPopup(false);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div className='flex-1 overflow-auto relative z-10 bg-white'>
            <Header title='Privacy Policies' />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <div className="content flex-1 p-6">
                    
                    {Array.isArray(policies) && policies.length > 0 ? (
                        <ul className="space-y-4">
                            {policies.map(policy => (
                                <li key={policy._id} className="bg-white text-black p-4 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{policy.sr_no}. {policy.title || 'Untitled'}</h3>
                                        <p>{policy.content}</p>
                                        <p><strong>Created At:</strong> {new Date(policy.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="button-container space-x-2 mt-2 md:mt-0">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => { setTitle(policy.title); setContent(policy.content); setShowPopup(true); }}>Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}

                    {showPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
                                <h2 className="text-lg font-semibold mb-4">Edit Privacy Policy</h2>
                                <label className="block mb-1">Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title"
                                    className="border p-2 rounded w-full mb-2"
                                />
                                <label className="block mb-1">Content:</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter content"
                                    className="border p-2 rounded w-full mb-4"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Privacy;
