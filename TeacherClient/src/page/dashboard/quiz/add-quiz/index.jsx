import React, { useState } from 'react';
import Papa from 'papaparse';

const CsvToJsonConverter = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
    };

    const handleConvert = () => {
        if (!csvFile) {
            alert('Please select a CSV file.');
            return;
        }

        Papa.parse(csvFile, {
            complete: (result) => {
                // Assuming CSV structure with headers
                const headers = result.data[0];
                const jsonData = result.data.slice(1).map((row) => {
                    const question = {};
                    headers.forEach((header, index) => {
                        if (header === 'Options') {
                            question[header] = row[index].split(',').map((option) => option.trim());
                        } else {
                            question[header] = row[index];
                        }
                    });
                    return question;
                });

                const finalJsonData = {
                    body: {
                        Title: 'Your Title',
                        Description: 'Your Description',
                        DateCreated: '2023-12-25',
                        SubjectID: 'YourSubjectID',
                        TopicName: 'YourTopicName',
                        Questions: jsonData,
                    },
                };

                setJsonData(finalJsonData);
            },
        });
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleConvert}>Convert</button>

            {jsonData && (
                <div>
                    <h2>Converted JSON Data:</h2>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CsvToJsonConverter;
