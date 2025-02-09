import mongoose from "mongoose";

const journalSchema = mongoose.Schema({
  title: { type: String, required: true},
  username: { type: String, required: true},
  description: { type: String, required: true},
  party: { type: String, required: true}
})

const Journal = mongoose.model('Journal', journalSchema)

export default Journal