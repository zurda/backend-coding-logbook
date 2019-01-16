const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    code: { type: String },
    author: { type: String, default: "Zurda" },
    originUrl: { type: String },
    labels: [{ type: String }],
    isPublic: { type: Boolean, required: true, default: true }
  },
  { timestamps: true }
);

module.exports = DataSchema;
