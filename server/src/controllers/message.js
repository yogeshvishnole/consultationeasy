import catchAsync from '../utils/catch-async';
import Message from '../models/message';
import APIFeatures from '../utils/apiFeatures';

export const createMessage = catchAsync(async (req, res, next) => {
  const { message, chatId } = req.body;
  const sender = req.user.id;
  const data = await Message.create({ message, sender, chat: chatId });
  res.status(201).json({
    status: 'success',
    data,
  });
});

export const getMessages = catchAsync(async (req, res, next) => {
  let features = new APIFeatures(Message.find(), req.query).filter();
  let data = await features.query;
  res.status(200).json({
    status: 'success',
    data,
  });
});
