import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth = true) => {
  const header = req.request
    ? req.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    return decoded.userId;
  }

  if (requireAuth) throw new Error('Authorization required');

  return null;
};

export { getUserId as default };
