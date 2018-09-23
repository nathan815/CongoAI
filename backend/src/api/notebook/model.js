import mongoose, { Schema } from 'mongoose'

const notebookSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true
  },
  html: {
    type: String
  },
  product: {
    type: Schema.ObjectId,
    ref: 'product',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

notebookSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      html: this.html,
      product: this.product.view(full),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('notebook', notebookSchema)

export const schema = model.schema
export default model
