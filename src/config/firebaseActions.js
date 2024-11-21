import { firestore } from "./firebase-config"; // Import Firestore instance
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

// Initialize or check user's score in the 'users' collection
export const initializeUserScore = async (userId,userName,url) => {
  try {
    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(firestore, 'users', userId);

    // Check if the user's document exists
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("User data:", userDocSnap.data());
      // User already exists; no need to initialize
    } else {
      // If the user does not exist, create a new document with default values
      await setDoc(userDocRef, {
        score: 0, // Default score
        name: userName, // Default value
        ProfileUrl: url, // Default value
      });
      console.log('New user initialized with default score');
    }
  } catch (error) {
    console.error('Error initializing user score:', error);
    throw new Error('Error initializing user score: ' + error.message);
  } 
};

// Update user's score in the same 'users' collection
export const updateUserScore = async (userId, newScore) => {
  if (!userId) {
    console.error("User is not authenticated.");
    return;
  }

  const userRef = doc(firestore, "users", userId); // Reference to Firestore document

  try {
    // Update the document with the new score
    await updateDoc(userRef, { score: newScore });
    console.log("Score updated successfully!");
  } catch (error) {
    console.error("Error updating score:", error);
    throw new Error("Error updating score: " + error.message);
  }
};
