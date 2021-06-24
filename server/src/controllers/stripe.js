import Stripe from 'stripe';
import Consultant from '../models/consultant';
import queryString from 'query-string';
import catchAsync from '../utils/catch-async';

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = catchAsync(async (req, res, next) => {
  const consultant = await Consultant.findOne({ user: req.user.id }).populate(
    'user',
    'name email role',
  );
  console.log('Consultant', consultant);
  if (!consultant.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'standard',
    });
    console.log('ACCOUNT ===> ', account);
    consultant.stripe_account_id = account.id;
    await consultant.save();
  }
  let accountLink = await stripe.accountLinks.create({
    account: consultant.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding',
  });

  accountLink = Object.assign(accountLink, {
    'stripe_user[email]': consultant.user.email || undefined,
  });

  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log('LOGIN LINK', link);
  res.status(200).json({
    status: 'success',
    data: link,
  });
});

export const getAccountStatus = catchAsync(async (req, res, next) => {
  const consultant = await Consultant.findOne({ user: req.user.id });
  const account = await stripe.accounts.retrieve(consultant.stripe_account_id);
  const updatedConsultant = await Consultant.findOneAndUpdate(
    { user: req.user.id },
    {
      stripe_seller: account,
    },
    { new: true },
  );
  res.status(200).json({
    status: 'success',
  });
});

export const getAccountBalance = catchAsync(async (req, res) => {
  const consultant = await Consultant.findOne({ user: req.user.id });
  const balance = await stripe.balance.retrieve({
    stripeAccount: consultant.stripe_account_id,
  });
  res.status(200).json({
    status: 'success',
    data: balance,
  });
});
