import express from 'express';
import { handleTokenAndDocument } from '../AppWrite_functions.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { token, docId, newData } = req.body;
  try {
    console.log("innnnnnnnnnnnnnnnnnn")
    await handleTokenAndDocument(token, docId, newData);
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {router as UpdateDocRouter};