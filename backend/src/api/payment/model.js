import mongoose, { Schema } from 'mongoose'

const paymentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  cardNumber: {
    type: String
  },
  expirationDate: {
    type: String
  },
  cardCode: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

paymentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCode: this.cardCode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Payment', paymentSchema)

export const schema = model.schema
export default model
