import mongoose, { Types } from 'mongoose';

const { ObjectId } = mongoose.Schema;

const consultantSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      unique: true,
    },
    description: {
      type: String,
    },
    nicheArea: {
      type: String,
      required: true,
      trim: true,
    },
    promoDescription: {
      type: String,
      required: true,
      trim: true,
    },
    mainMarketingHead: {
      type: String,
      required: true,
      trim: true,
    },
    elaboration: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    facebook: {
      type: String,
      required: true,
      trim: true,
    },
    linkedin: {
      type: String,
      required: true,
      trim: true,
    },
    promoImage: {
      url: String,
      key: String,
    },
    consultantImage: {
      url: String,
      key: String,
    },
    categories: [
      {
        type: ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    experience: {
      type: Number,
      max: [70, 'Experience must be below 70'],
      min: [3, 'Experience must be above 3'],
    },
    avgRating: {
      type: Number,
      default: 4.5,
      max: [5, 'Rating must be below 5'],
      min: [1, 'Rating must be above 1'],
      set: val => Math.round(val * 10) / 10,
    },
    price: {
      type: Number,
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  },
);

const Consultation = mongoose.model('Consultant', consultantSchema);

export default Consultation;
