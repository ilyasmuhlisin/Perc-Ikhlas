// untuk membuat id penulis/pengguna
const ObjectId = require("mongodb").ObjectId;

const families = [
  {
    maleName: "test",
    maleParent: "test",
    maleAddress: "test",
    receptionDate: "test",
    receptionPlace: "test",
    femaleName: "test",
    femaleParent: "test",
    femaleAddress: "test",
    agreementDate: "test",
    agreementPlace: "test",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    maleName: "test",
    maleParent: "test",
    maleAddress: "test",
    receptionDate: "test",
    receptionPlace: "test",
    femaleName: "test",
    femaleParent: "test",
    femaleAddress: "test",
    agreementDate: "test",
    agreementPlace: "test",
    user: { _id: ObjectId(), name: "John Doe" },
  },
  {
    maleName: "test",
    maleParent: "test",
    maleAddress: "test",
    receptionDate: "test",
    receptionPlace: "test",
    femaleName: "test",
    femaleParent: "test",
    femaleAddress: "test",
    agreementDate: "test",
    agreementPlace: "test",
    user: { _id: ObjectId(), name: "John Doe" },
  },
];

module.exports = families;
