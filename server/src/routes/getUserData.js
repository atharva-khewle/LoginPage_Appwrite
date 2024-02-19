import express from 'express';
import { getDocumentById } from '../AppWrite_functions.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { docId } = req.query;
    
    try {
        console.log("in",docId)
        const userData = await getDocumentById(docId);

        console.log(userData)
        const { username, location, DOB } = userData; 
        res.json({
            username,
            location,
            DOB
        });
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { router as UserDataRouter };
