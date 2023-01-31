import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
    /*?false: whenevr we crete new task we creat with only name so do not want pass this completed */
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, 
{ timestamps: true });

export default mongoose.model('Task', taskSchema);