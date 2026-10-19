import jwt from "jsonwebtoken";

const accessToken = (id) => {
   if (!id) {
      throw new Error('User ID is required');
   }

   return jwt.sign({ id }, process.env.API_SECRET, { expiresIn: '7m' });
};

const refreshToken = (id) => {
   if (!id) {
      throw new Error('User ID is required');
   }

   return jwt.sign({ id }, process.env.REFRESH_API_SECRET, { expiresIn: '30d' });
};

export { accessToken, refreshToken };