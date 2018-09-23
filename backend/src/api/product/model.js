import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  category: {
    type: String
  },
  reviews: {
    type: Schema.ObjectId,
    ref: 'review',
    required: false
  },
  notebook: {
    type: Schema.ObjectId,
    ref: 'notebook',
    required: false
  },
  modelname: {
    type: String
  },
  port: {
    type: String
  },
  filepath: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      title: this.title,
      desc: this.desc,
      category: this.category,
      reviews: this.reviews,
      notebook: this.notebook,
      modelname: this.modelname,
      port: this.port,
      filepath: this.filepath,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
