import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const bookingSchema = new Schema(
  {
    consultant: {
      type: ObjectId,
      ref: 'Consultant',
    },
    communicationType: {
      type: String,
      enum: {
        values: ['chat', 'video', 'voice'],
        message: 'Communication type must ne either chat,video or voice.',
      },
    },
    session: {},
    user: { type: ObjectId, ref: 'User' },
    numOfDays: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model('booking', bookingSchema);

export default Booking;
