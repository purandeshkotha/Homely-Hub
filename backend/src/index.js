import a3a from 'express';
import a3b from 'cors';
import dotenv from 'dotenv';
import a3c from 'cookie-parser';
import a3d from './utils/db.js';
import { router } from './routes/userRoutes.js';
import { propertyRouter } from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';
import { readFileSync } from 'fs';
import { Property } from './Models/PropertyModel.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv['config']();
const app = a3a();
app['use'](a3b({
    'origin': process['env']['ORIGIN_ACCESS_URL'],
    'credentials': !![]
})), app['use'](a3a['json']({ 'limit': '100mb' })), app['use'](a3a['urlencoded']({
    'limit': '100mb',
    'extended': !![]
})), app['use'](a3c());
const port = process['env']['PORT'] || 0x1f91;
const __dirname = dirname(fileURLToPath(import.meta.url));

app['get']('/api/v1/seed', async (req, res) => {
    try {
        const properties = JSON.parse(readFileSync(join(__dirname, '../properties.json'), 'utf-8'));
        const propertyTypeMap = { guest_house: 'Guest House', house: 'House', flat: 'Flat', hotel: 'Hotel' };
        const roomTypeMap = { 'entire home': 'Entire Home', room: 'Room', anytype: 'Anytype' };
        const amenityNameMap = { wifi: 'Wifi', kitchen: 'Kitchen', ac: 'Ac', 'washing machine': 'Washing Machine', tv: 'Tv', pool: 'Pool', 'free parking': 'Free Parking' };
        const cleaned = properties.map(({ _id, userId, ...rest }) => ({
            ...rest,
            propertyType: propertyTypeMap[rest.propertyType] || rest.propertyType,
            roomType: roomTypeMap[rest.roomType] || rest.roomType,
            amenities: (rest.amenities || []).map(({ _id, ...a }) => ({ ...a, name: amenityNameMap[a.name?.toLowerCase()] || a.name })),
            images: (rest.images || []).map(({ _id, ...img }) => img),
        }));
        await Property.deleteMany({});
        await Property.collection.insertMany(cleaned);
        res.json({ success: true, message: `Seeded ${cleaned.length} properties!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

a3d(), app['use']('/api/v1/rent/user', router), app['use']('/api/v1/rent/listing', propertyRouter), app['use']('/api/v1/rent/user/booking', bookingRouter), app['listen'](port, () => {
    console['log']('App\x20running\x20on\x20port:\x20' + port);
});