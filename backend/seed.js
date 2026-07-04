import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { Property } from './src/Models/PropertyModel.js';

dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    const properties = JSON.parse(readFileSync('./properties.json', 'utf-8'));

    // normalize enum values to match schema and strip MongoDB extended JSON fields
    const propertyTypeMap = { guest_house: 'Guest House', house: 'House', flat: 'Flat', hotel: 'Hotel' };
    const roomTypeMap = { 'entire home': 'Entire Home', room: 'Room', anytype: 'Anytype' };
    const amenityNameMap = { wifi: 'Wifi', kitchen: 'Kitchen', ac: 'Ac', 'washing machine': 'Washing Machine', tv: 'Tv', pool: 'Pool', 'free parking': 'Free Parking' };

    const cleaned = properties.map(({ _id, userId, ...rest }) => ({
        ...rest,
        propertyType: propertyTypeMap[rest.propertyType] || rest.propertyType,
        roomType: roomTypeMap[rest.roomType] || rest.roomType,
        amenities: (rest.amenities || []).map(({ _id, ...a }) => ({
            ...a,
            name: amenityNameMap[a.name?.toLowerCase()] || a.name,
        })),
        images: (rest.images || []).map(({ _id, ...img }) => img),
    }));

    await Property.deleteMany({});
    await Property.collection.insertMany(cleaned);

    console.log(`Seeded ${cleaned.length} properties successfully!`);
    process.exit(0);
};

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
