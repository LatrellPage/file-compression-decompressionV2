import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert, CircularProgress, Fade } from '@mui/material';

function App() {
    const {
        selectedFile,
        handleFileSelect,
        handleCompression,
        loading,
        fileSelected,
        message,
        setMessage
    } = useFileSelector();

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="parent-container">
            <div>
                <div className="p-container">
                    <h1 className="header-text">{fileSelected ? "" : "Upload a file to compress"}</h1>
                </div>
                <div className="p-container">
                    <p style={{ width: "fit-content" }}>
                        {fileSelected ? "" : "Select a file to reduce its file size with our compressor"}
                    </p>
                </div>
                {selectedFile && (
                    <div className="p-container">
                        <p style={{ width: "fit-content", color: "#0866fd" }}>{selectedFile.name}</p>
                    </div>
                )}
                <div className="button-container">
                    <Button
                        variant="contained"
                        onClick={fileSelected ? handleCompression : triggerFileInput}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : fileSelected ? "Compress File" : "Select File"}
                    </Button>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    id="fileInput"
                />
            </div>
            <Snackbar
                open={!!message}
                autoHideDuration={3000}
                onClose={() => setMessage(null)}
                TransitionComponent={Fade}
            >
                <Alert
                    onClose={() => setMessage(null)}
                    severity={message?.type}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {message?.text}
                </Alert>
            </Snackbar>
        </div>
    );
}

const useFileSelector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
                if (message.type === 'success') {
                    // Reset UI after successful compression
                    setSelectedFile(null);
                    setFileSelected(false);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleFileSelect = (event) => {
        if (event.target && event.target.files) {
            setSelectedFile(event.target.files[0]);
            setFileSelected(true);
            setMessage(null);
        }
    };

    const handleCompression = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setMessage(null);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('compressorType', 'gz');

        try {
            console.log('Sending file to server:', selectedFile.name);
            const response = await axios.post('http://localhost:8080/api/compress', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Received response from server:', response);

            // Handle the compressed file response
            const compressedFile = new Blob([response.data], { type: response.headers['content-type'] });

            // Trigger file download
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(compressedFile);
            downloadLink.download = `${selectedFile.name}.gz`;
            downloadLink.click();
            console.log('File download triggered');

            setMessage({ type: 'success', text: `${selectedFile.name} compressed successfully!` });

            // Reset UI state after successful compression
            setTimeout(() => {
                setSelectedFile(null);
                setFileSelected(false);
            }, 3000);

        } catch (error) {
            console.error('Error compressing file:', error);
            if (error.response) {
                setMessage({ type: 'error', text: `Server error: ${error.response.status}` });
            } else if (error.request) {
                setMessage({ type: 'error', text: 'No response received from server' });
            } else {
                setMessage({ type: 'error', text: `Error: ${error.message}` });
            }
        } finally {
            setLoading(false);
        }
    };

    return { selectedFile, handleFileSelect, handleCompression, loading, fileSelected, message, setMessage };
};

export default App;