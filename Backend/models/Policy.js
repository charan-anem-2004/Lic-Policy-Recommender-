import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  planNumber: Number,
  uin: String,
  entryAge: Number,
  term: Number,
  sumAssured: Number,
  premium: Number,
  vectorized: {
    type: Boolean,
    default: false
  }
});

// ✅ Only define the model if it's not already defined
const Policy = mongoose.models.Policy || mongoose.model('Policy', policySchema);

export default Policy;
