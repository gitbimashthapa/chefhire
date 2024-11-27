// components/PackageTracker.js
import React, { useState } from 'react';
import axios from 'axios';

const PackageTracker = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [packageStatus, setPackageStatus] = useState(null);

    const handleTrackPackage = async () => {
        try {
            const response = await axios.get(`/api/packages/${trackingNumber}`);
            setPackageStatus(response.data);
        } catch (error) {
            console.error('Error fetching package status:', error);
            setPackageStatus(null);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={trackingNumber} 
                onChange={(e) => setTrackingNumber(e.target.value)} 
                placeholder="Enter Tracking Number" 
            />
            <button onClick={handleTrackPackage}>Track Package</button>
            {packageStatus && (
                <div>
                    <h3>Package Status:</h3>
                    <p>{packageStatus.status}</p>
                </div>
            )}
        </div>
    );
};

export default PackageTracker;