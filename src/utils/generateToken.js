import jwt from 'jsonwebtoken';

const generateToken = userId => {
  console.log(process.env.JWT_SECRET)
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET);
};

export { generateToken as default };
