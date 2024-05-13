import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {urlConfig} from '../../config';

function SearchPage() {
    // Task 1: Initialize state variables for search criteria and results
    /*insert code here*/

   const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    //something went wrong
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results based on user inputs
    /*insert code here*/

    // Task 3: Dynamically generate category dropdown options
    /*insert code here*/

    // Task 4: Dynamically generate condition dropdown options
    /*insert code here*/

    // Task 5: Implement age range slider
    /*insert code here*/

    // Task 6: Display fetched search results
    /*insert code here*/

    const navigate = useNavigate();

    // Task 7: Navigate to the details page when a result is clicked
    /*insert code here*/

    // Task 8: Implement error handling for fetch operation
    /*insert code here*/

    // Task 9: Add input field for search query
    /*insert code here*/

    // Task 10: Implement search button with onClick event to trigger search
    /*insert code here*/

    // Task 11: Handle loading state during API request
    /*insert code here*/

    // Task 12: Show a message if no results are found
    /*insert code here*/

    return (
        <div className="search-page-container">
            {/* Implement UI elements here, bind them with state variables and event handlers */}
            {{/*insert code here*/}}
        </div>
    );
}

export default SearchPage;
