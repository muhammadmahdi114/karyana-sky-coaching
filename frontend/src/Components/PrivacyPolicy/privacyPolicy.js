import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function PrivacyPolicy() {
    const [editorContent, setEditorContent] = useState(``);
    const [editContent, setEditContent] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get-privacy-policy`);
                setEditorContent(response.data.privacyPolicy);
            } catch (error) {
                console.error('Error fetching privacy policy:', error);
            }
        };
        fetchContent();
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/add-privacy-policy`, {
                content: editorContent,
            });

            if (response.status === 200) {
                alert("Privacy Policy saved successfully!");
                setEditContent(false);
            } else {
                console.error(response.data.message);
                alert("Failed to save Privacy Policy.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while saving.");
        }
    };

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl my-6">Privacy Policy</h1>
                    <button
                        onClick={() => setEditContent(true)}
                        className="bg-[#89b8ff] text-primary flex gap-x-2 items-center h-14 px-4 py-2 rounded-xl"
                    >
                        <img src="edit.svg" alt="Edit" className="h-6" />
                        Edit
                    </button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <ReactQuill
                        value={editorContent}
                        readOnly={true}
                        theme="bubble"
                    />
                </div>
                {editContent && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
                            <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">
                                Edit Privacy Policy
                            </h2>
                            <div className="px-6">
                                <ReactQuill
                                    value={editorContent}
                                    onChange={setEditorContent}
                                    theme="snow"
                                    className="bg-white rounded-xl p-4 shadow-md"
                                />
                            </div>
                            <div className="flex justify-between gap-x-3 m-4">
                                <button
                                    onClick={() => setEditContent(false)}
                                    className="bg-gray-300 rounded-lg px-10 py-2 transition duration-150 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white rounded-lg px-12 py-2 transition duration-150 hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
