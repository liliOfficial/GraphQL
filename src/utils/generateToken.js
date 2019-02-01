import jwt from 'jsonwebtoken';

const generateToken = userId => {
  return jwt.sign({ userId: userId }, 'secretkey');
};

export { generateToken as default };
