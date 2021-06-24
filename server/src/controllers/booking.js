import Stripe from 'stripe';
import catchAsync from '../utils/catch-async';
import Consultant from '../models/consultant';
import User from '../models/user';
import Booking from '../models/booking';
import APIfeatures from '../utils/apiFeatures';
import { calcPrice } from '../utils/calcPrice';
import Chat from '../models/chat';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const stripeSessionId = catchAsync(async (req, res, next) => {
  // console.log("you hit stripe session id", req.body.hotelId);
  // 1 get consultant id from req.body
  const { id, communicationType, numOfDays } = req.body;
  // 2 find the consultant based on consultant id from db
  const consultant = await Consultant.findById(id).populate('user');
  // 3 20% charge as application fee

  // 4 create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // 5 purchasing item details, it will be shown to user on checkout
    line_items: [
      {
        name: consultant.user.name,
        amount: calcPrice(communicationType, numOfDays, consultant.price) * 100, // in cents
        currency: 'usd',
        quantity: 1,
      },
    ],
    // 6 create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      //   application_fee_amount: fee * 100,
      // this seller can see his balance in our frontend dashboard
      transfer_data: {
        destination: consultant.user.stripe_account_id,
      },
    },
    // success and calcel urls
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${consultant._id}?communicationType=${communicationType}&numOfDays=${numOfDays}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });
  // 7 add this session object to user in the db
  await Consultant.findByIdAndUpdate(consultant._id, {
    stripeSession: session,
  });
  // 8 send session id as resposne to frontend
  res.status(200).json({
    status: 'success',
    data: session.id,
  });
});

export const stripeSuccess = async (req, res, next) => {
  // 1 get hotel id from req.body
  const { id, communicationType, numOfDays } = req.body;
  // 2 find currently logged in user
  const consultant = await Consultant.findById(id);
  // check if user has stripeSession
  if (!consultant.stripeSession) {
    console.log('consultant stripe session', consultant.stripeSession);
    next();
  }
  // 3 retrieve stripe session, based on session id we previously save in user db
  const session = await stripe.checkout.sessions.retrieve(
    consultant.stripeSession.id,
  );
  // 4 if session payment status is paid, create order
  if (session.payment_status === 'paid') {
    // 5 check if order with that session id already exist by querying orders collection
    const bookingExist = await Booking.findOne({
      'session.id': session.id,
    });
    if (bookingExist) {
      // 6 if order exist, send success true
      res.json({ status: 'success', data: true });
    } else {
      // 7 else create new order and send success true
      let newBooking = await new Booking({
        consultant: id,
        session,
        user: req.user.id,
        communicationType,
        numOfDays,
      }).save();
      // create chat between these two users
      await Chat.create({ users: [req.user.id, consultant?.user] });
      // 8 remove user's stripeSession
      await Consultant.findByIdAndUpdate(req.user.id, {
        $set: { stripeSession: {} },
      });
      res.json({ status: 'success', data: true });
    }
  } else {
    res.json({ status: 'success', data: false });
  }
};

export const getAllBookings = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let data = await features.query.populate('consultant').populate('user');
  data = await User.populate(data, { path: 'consultant.user' });
  return res.status(200).json({
    status: 'success',
    count: data.length,
    data,
  });
});

export const getBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let data = await Booking.findById(id).populate('consultant');
  data = await User.populate(data, { path: 'consultant.user' });
  res.status(200).json({
    status: 'success',
    data,
  });
});
