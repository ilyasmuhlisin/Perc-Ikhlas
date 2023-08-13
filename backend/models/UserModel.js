const mongoose = require("mongoose");
const Family = require("./FamilyModel");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
    families: {
      maleName: { type: String },
      maleParent: { type: String },
      maleAddress: { type: String },
      receptionDate: { type: String },
      receptionPlace: { type: String },
      femaleName: { type: String },
      femaleParent: { type: String },
      femaleAddress: { type: String },
      agreementDate: { type: String },
      agreementPlace: { type: String },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
