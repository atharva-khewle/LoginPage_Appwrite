import { Client, Databases, Query } from "node-appwrite"; 
import secrettoken, { initAppwriteClient } from "./secret_info.js";
import { ID } from "appwrite";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




export async function createUserDocument(username, password, location, dob) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 

    try {
        const hashedPass = await bcrypt.hash(password, 10);

        // Creates document in Appwrite
        const result = await databases.createDocument(databaseId, collectionId, ID.unique(), {
            "username": username,
            "password": hashedPass,
            "location": location,
            "DOB": dob
        });
        // console.log("id ddddddddddddddddddddddd;   ",result.$id)

        console.log('User document created:', result);
        return result;
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
}

export async function checkIfUserExists(username) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 

    try {
        const query = [
            Query.equal('username', username) 
        ];

        const response = await databases.listDocuments(databaseId, collectionId, query);

        if (response.documents.length > 0) {
            // user exists
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

export async function getUserIdbyUsername(username) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 

    try {
        const query = [
            Query.equal('username', username) 
        ];

        const response = await databases.listDocuments(databaseId, collectionId, query);

        if (response.documents.length > 0) {
            // user exists
            return response.documents[0].$id;
        } else {
            return -1;
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

export async function getDatabyUsername(username) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 

    try {
        const query = [
            Query.equal('username', username) 
        ];

        const response = await databases.listDocuments(databaseId, collectionId, query);

        if (response.documents.length > 0) {
            // user exists
            return response.documents[0];
        } else {
            return "-1";
        }
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}


export async function getDocumentById(documentId) {
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 
    const { databases } = initAppwriteClient();

    try {
        const response = await databases.getDocument(databaseId, collectionId, documentId);
        console.log('Document retrieved successfully:', response);
        return response;
    } catch (error) {
        console.error('Error retrieving document:', error);
        throw error;
    }
}


export async function updateUserDocument(docId, newUsername, newDob, newLocation) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB'; 
    const collectionId = 'Users'; 

    try {
        // Get the existing user document
        const userDocument = await databases.getDocument(databaseId, collectionId, docId);

        // Update the fields with new values
        userDocument.username = newUsername;
        userDocument.DOB = newDob;
        userDocument.location = newLocation;

        // Save the updated document
        const updatedDocument = await databases.updateDocument(databaseId, collectionId, docId, userDocument);

        console.log('User document updated successfully:', updatedDocument);
        return updatedDocument;
    } catch (error) {
        console.error('Error updating user document:', error);
        throw error;
    }
}


export function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secrettoken);
      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
  
  export async function updateDocument(docId, prevDoc, newData) {
    const { databases } = initAppwriteClient();
    const databaseId = 'Home-DB';
    const collectionId = 'Users';

    try {
        const currentDocument = await databases.getDocument(databaseId, collectionId, docId);
        
        const mergedData = { ...prevDoc, ...newData };

        const nonEmptyFields = Object.fromEntries(Object.entries(mergedData).filter(([_, value]) => value !== ''));

        const response = await databases.updateDocument(databaseId, collectionId, docId, nonEmptyFields);
        
        console.log('Document updated successfully:', response);
        return response;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

  
  
  export async function handleTokenAndDocument(token, docId, newData) {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new Error('Token verification failed');
    }
    await updateDocument(docId, newData);
  }