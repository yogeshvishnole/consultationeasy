import Chat from '../models/chat';
import catchAsync from '../utils/catch-async';

export const getChat = catchAsync(async (req, res, next) => {
  const { users } = req.query;
  const usersArray = users.split(',');
  let data = await Chat.findOne({ users: usersArray });
  res.status(200).json({
    status: 'success',
    data,
  });
});
