import db from "../db/db.js";

export const getAllUsersModel = async () => {
  try {
    const query = "SELECT * FROM users";

    const [result] = await db.query(query);

    return result.length === 0 ? null : result;
  } catch (error) {
    throw new Error(`Error in getting all user ${error}`);
  }
};

export const getUserByIdModel = async (userId) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?"
    const [result] = await db.query(query, [userId,]);
    
    return result.length === 0 ? null : result;
  } catch (error) {
    console.error(error.message);
    throw new Error(`Error in getting user By Id ${error}`);
  }
};

export const editUserByIdModel = async (
  userId,
  firstName,
  lastName,
  middleName,
  email,
  profileUrl,
  phone
) => {
  try {
    const [updateResult] = await db.query(
      "UPDATE users SET first_name = ?, last_name = ?, middle_name = ?, email = ?, profile_url = ?, phone = ? WHERE id = ?",
      [firstName, lastName, middleName, email, profileUrl, phone, userId]
    );
    return updateResult;
  } catch (error) {
    console.log(error);
    throw new Error(`Error in updating user: ${error.message}`);
  }
};

export const deleteUserByIdModal = async (userId) => {
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ? ", [
      userId,
    ]);
    return result;
  } catch (error) {
    throw new Error(`Error in deleting user By Id ${error}`);
  }
};

// export const updateUserPasswordModel = async (userId, hashPassword) => {
//   try {
//   } catch (error) {}
// };
