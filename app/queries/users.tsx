
import User from "@/app/model/user-model";

export async function createUser(userData: any) {
  console.log("Creating user with data:", userData); // Debug log to see incoming data
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error: any) {
    // 1. Log the original error so YOU can see it in the terminal
    console.error("Database Error Detail:", error); 
    
    throw error; 
  }
}