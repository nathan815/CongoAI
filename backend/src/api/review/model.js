import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true
  },
  rating: {
    type: String
  },
  text: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reviewSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      rating: this.rating,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('review', reviewSchema)

export const schema = model.schema
export default model
