import bcrypt from "bcryptjs";

export default async function checkUser(dbUser, loginPassword) {
  if (!dbUser) {
    return false;
  }

  // check if "login user password" matches "hashed user password in DB"
  const isValidPassword = await bcrypt.compare(loginPassword, dbUser.password);

  if (!isValidPassword) {
    return false;
  }

  return true;
}
