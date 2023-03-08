const mongoose = require("mongoose");

const offlineSchema = mongoose.Schema(
  {
    maleName: { type: String, required: true },
    maleParent: { type: String, required: true },
    maleAddress: { type: String, required: true },
    receptionDate: { type: String, required: true },
    receptionPlace: { type: String, required: true },
    femaleName: { type: String, required: true },
    femaleParent: { type: String, required: true },
    femaleAddress: { type: String, required: true },
    agreementDate: { type: String, required: true },
    agreementPlace: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Offline = mongoose.model("Offline", offlineSchema);
module.exports = Offline;
