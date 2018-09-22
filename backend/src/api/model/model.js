import mongoose, { Schema } from 'mongoose'

const modelSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  Notebook: {
    type: String
  },
  name: {
    type: String
  },
  port: {
    type: String
  },
  filepath: {
    type: String
  },
  category: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

modelSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      Notebook: this.Notebook,
      name: this.name,
      port: this.port,
      filepath: this.filepath,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Model', modelSchema)

export const schema = model.schema
export default model
