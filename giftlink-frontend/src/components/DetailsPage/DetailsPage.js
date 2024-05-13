import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Task 1: Check for authentication and redirect
        {{insert code here}}

        // Task 2: Fetch gift details
        {{insert code here}}

        // Task 3: Scroll to top on component mount
        {{insert code here}}
    }, [productId]);

    // Task 4: Handle back click
    const handleBackClick = () => {{insert code here}};

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;

    return (
        <div className="container mt-5">
            <button onClick={handleBackClick}>Back</button>
            <div className="card">
                <div className="card-header">
                    <h2>{gift ? gift.name : 'Gift Details'}</h2>
                </div>
                <div className="card-body">
                    // Task 5: Display gift image
                    {{insert code here}}
                    // Task 6: Display gift details
                    {{insert code here}}
                </div>
            </div>
            // Task 7: Render comments section
            {{insert code here}}
        </div>
    );
}

export default DetailsPage;
