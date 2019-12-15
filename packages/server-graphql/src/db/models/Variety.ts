import mongoose from 'mongoose'

const Variety = new mongoose.Schema({
  name: {
    type: String,
  },
})

export default mongoose.model('variety', Variety, 'varieties')
