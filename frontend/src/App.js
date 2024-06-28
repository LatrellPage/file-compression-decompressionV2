import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const { selectedFile, handleFileChange } = useFileSelector();

    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    const compressFile = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('compressorType', 'gz');
            handleFileChange(formData);
        }
    };

    return (
        <div className="parent-container">
            <div>
                <div className="p-container"><h1 className="header-text">{ selectedFile ? "" : "Upload a file to compress"}</h1></div>
                <div className="p-container">
                    <p style={{ width: "fit-content" }}>
                        { selectedFile ? "" : "Drag and drop a file to reduce its file size with our compressor"}
                    </p>
                </div>
                {selectedFile && (
                    <div className="p-container">
                        <p style={{ width: "fit-content", color: "#0866fd" }}>{selectedFile.name}</p>
                    </div>
                )}
                <div className="button-container">
                    <div className="upload-button" onClick={selectedFile ? compressFile : triggerFileInput} >
                        {selectedFile ? "Compress File" : "Upload File"}
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                />
            </div>
        </div>
    );
}

const useFileSelector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        setLoading(true);
        let file;
        if (event instanceof FormData) {
            file = event.get('file');
        } else if (event.target && event.target.files) {
            file = event.target.files[0];
        }

        if (file) {
            setSelectedFile(file);
            try {
                console.log('Sending file to server:', file.name);
                const formData = new FormData();
                formData.append('file', file);
                formData.append('compressorType', 'gz');
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
                downloadLink.download = 'compressed.gz';
                downloadLink.click();
                console.log('File download triggered');
            } catch (error) {
                console.error('Error compressing file:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            } finally {
                setLoading(false);
            }
        } else {
            console.error("No file provided");
            setLoading(false);
        }
    };

    return { selectedFile, handleFileChange };
};

export default App;
