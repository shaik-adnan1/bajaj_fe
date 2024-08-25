// src/JsonProcessor.js
import React, { useState } from 'react';
import axios from 'axios';

export const Input2 = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const setArr = ["alphabets", "highest_lowercase_alphabet", "numbers"]

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate JSON input
        let parsedData;
        try {
            parsedData = JSON.parse(jsonInput);
            if (!parsedData.data || !Array.isArray(parsedData.data)) {
                throw new Error('Invalid data structure');
            }
        } catch (err) {
            setError('Invalid JSON input');
            return;
        }

        setError('');
        setData(parsedData.data);

        // Call the REST API
        try {
            const response = await axios.post('https://demo-brown-chi.vercel.app/bfhl', parsedData);
            const { highest_lowercase_alphabet, numbers, alphabets } = response.data;
            setResponseData([highest_lowercase_alphabet, numbers, alphabets]);
            console.log("response.data ", response.data);
        } catch (err) {
            setError('API call failed');
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div>
            <h1>Bajaj Test Input</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="5"
                    cols="50"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter A VALID JSON'
                />
                <br />
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {data.length > 0 && (
                <div>
                    <label>
                        Filter Results:
                        <select multiple={true} onChange={handleSelectChange}>
                            <option value="Alphabets">Alphabets</option>
                            <option value="Numbers">Numbers</option>
                            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                        </select>
                    </label>
                    <ul>
                        {responseData.map((item, index) => (
                            <>
                                <p>{setArr[index]}: {item}</p>
                            </>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
