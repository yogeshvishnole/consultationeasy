import { nanoid } from 'nanoid';
import s3 from '../services/aws-s3';
import catchAsync from '../utils/catch-async';
import User from '../models/user';
import Consultant from '../models/consultant';
import BusinessError from '../exceptions/business-error';
import APIfeatures from '../utils/apiFeatures';

export const createConsultant = catchAsync(async (req, res, next) => {
  if (req.body.categories.length < 1) {
    return next(new BusinessError('At least one category should be selected'));
  }

  const base64DataConsultantImage = new Buffer.from(
    req.body.consultantImage.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  const typeConsultantImage = req.body.consultantImage
    .split(';')[0]
    .split('/')[1];
  const base64DataPromoImage = new Buffer.from(
    req.body.promoImage.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  const typePromoImage = req.body.promoImage.split(';')[0].split('/')[1];

  const s3ConsultantImageParams = {
    Bucket: 'consultationeasy',
    Key: `consultant/${nanoid()}.${typeConsultantImage}`,
    Body: base64DataConsultantImage,
    ContentEncoding: 'base64',
    ACL: 'public-read',
    ContentType: `image/${typeConsultantImage}`,
  };

  const s3PromoImageParams = {
    Bucket: 'consultationeasy',
    Key: `promo/${nanoid()}.${typePromoImage}`,
    Body: base64DataPromoImage,
    ContentEncoding: 'base64',
    ACL: 'public-read',
    ContentType: `image/${typePromoImage}`,
  };

  const storedConsultantImage = await s3
    .upload(s3ConsultantImageParams)
    .promise();
  const storedPromoImage = await s3.upload(s3PromoImageParams).promise();

  req.body.consultantImage = {};
  req.body.promoImage = {};
  req.body.consultantImage.url = storedConsultantImage.Location;
  req.body.consultantImage.key = storedConsultantImage.key;
  req.body.promoImage.url = storedPromoImage.Location;
  req.body.promoImage.key = storedPromoImage.key;

  const consultant = new Consultant(req.body);
  consultant.user = req.user._id;
  const newConsultant = await consultant.save();

  await User.findByIdAndUpdate(newConsultant.user, { isConsultant: true });

  return res.status(201).json({
    status: 'success',
    message: 'You become consultant now',
    data: {
      data: newConsultant,
    },
  });
});

export const getConsultantBYuserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const consultant = await Consultant.findOne({ user: userId });
  res.status(200).json({
    status: 'success',
    data: consultant,
  });
});

export const getConsultants = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Consultant.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  return res.status(200).json({
    status: 'success',
    count: data.length,
    data,
  });
});

export const getConsultantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Consultant.findById(id).populate('user', 'email ');
  res.status(200).json({
    status: 'success',
    data,
  });
});
