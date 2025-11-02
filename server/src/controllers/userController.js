import User from '../models/User.js';
export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash');
    res.json(user);
  } catch (e) { next(e); }
};
