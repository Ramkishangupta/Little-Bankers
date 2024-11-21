import { firestore } from "./firebase-config"; // Import Firestore instance
import { doc, setDoc, updateDoc, collection, addDoc ,getDoc} from "firebase/firestore"; // Import Firestore functions


export const initializeUserScore = async (userId) => {
  try {
    // Get the user's document from Firestore
    const userDocRef = doc(firestore, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);  // Correct usage of getDoc

    if (userDocSnap.exists()) {
      console.log("User data:", userDocSnap.data());
      // Initialize or update the user's score or other data if needed
    } else {
      // If user does not exist, create a new document with a default score or data
      await setDoc(userDocRef, {
        score: 0,  // Example data, you can modify this
        name: '',  // Default value
        email: '',  // Default value
      });
      console.log('New user initialized with default score');
    }
  } catch (error) {
    console.error('Error initializing user score:', error);
    throw new Error('Error initializing user score: ' + error.message);  // Throw the error for further handling
  }
};



// Update user score in Firestore
export const updateUserScore = async (userId, newScore) => {
  if (!userId) {
    console.error("User is not authenticated.");
    return;
  }

  const userRef = doc(firestore, "scores", userId); // Match the document ID to the userId

  try {
    await updateDoc(userRef, { score: newScore });
    console.log("Score updated successfully!");
  } catch (error) {
    console.error("Error updating score:", error);
  }
};
