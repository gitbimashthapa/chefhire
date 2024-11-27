// services/packageService.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure you have your MongoDB URI in .env
const client = new MongoClient(uri);

export const addPackage = async (packageData) => {
    try {
        await client.connect();
        const database = client.db('chefhire');
        const packages = database.collection('packages');
        const result = await packages.insertOne(packageData);
        return result;
    } finally {
        await client.close();
    }
};

export const getPackageStatus = async (trackingNumber) => {
    try {
        await client.connect();
        const database = client.db('chefhire');
        const packages = database.collection('packages');
        const packageInfo = await packages.findOne({ trackingNumber });
        return packageInfo;
    } finally {
        await client.close();
    }
};