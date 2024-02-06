const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  reqString: { type: "string", required: true },
  string: { type: "string" },
  number: { type: "number" },
  boolean: { type: "boolean", default: false },
  type: {
    type: "string",
    enum: ["Type 1", "Type 2", "Type 3"],
  },
});

module.exports = mongoose.model("Model", modelSchema);
