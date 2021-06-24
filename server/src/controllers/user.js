import catchAsync from '../utils/catch-async';
import User from '../models/user';

export const me = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
