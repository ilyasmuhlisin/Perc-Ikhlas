const Offline = require("../models/OfflineOrdersModel");
const Family = require("../models/FamilyModel");
const User = require("../models/UserModel");
// const ObjectId = require("mongodb").ObjectId;

const getFamilyById = async (req, res, next) => {
  try {
    // didalam detail produk menampilkan ulasan sesuai id
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const adminDeleteFamily = async (req, res, next) => {
  try {
    const family = await Family.findById(req.params.id).orFail();
    await family.remove();
    res.json({ message: "user family removed" });
  } catch (err) {
    next(err);
  }
};

const adminUpdateUserFamily = async (req, res, next) => {
  try {
    const family = await Family.findById(req.params.id).orFail();
    const {
      maleName,
      maleParent,
      maleAddress,
      receptionDate,
      receptionPlace,
      femaleName,
      femaleParent,
      femaleAddress,
      agreementDate,
      agreementPlace,
    } = req.body;

    family.maleName = maleName || family.maleName;
    family.maleParent = maleParent || family.maleParent;
    family.maleAddress = maleAddress || family.maleAddress;
    family.receptionDate = receptionDate || family.receptionDate;
    family.receptionPlace = receptionPlace || family.receptionPlace;
    family.femaleName = femaleName || family.femaleName;
    family.femaleParent = femaleParent || family.femaleParent;
    family.femaleAddress = femaleAddress || family.femaleAddress;
    family.agreementDate = agreementDate || family.agreementDate;
    family.agreementPlace = agreementPlace || family.agreementPlace;

    await family.save();
    res.json({
      message: "user family updated",
    });
  } catch (err) {
    next(err);
  }
};

const createUserFamily = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.families.maleName = req.body.maleName || user.families.maleName;
    user.families.maleParent = req.body.maleParent || user.families.maleParent;
    user.families.maleAddress =
      req.body.maleAddress || user.families.maleAddress;
    user.families.receptionDate =
      req.body.receptionDate || user.families.receptionDate;
    user.families.receptionPlace =
      req.body.receptionPlace || user.families.receptionPlace;
    user.families.femaleName = req.body.femaleName || user.families.femaleName;
    user.families.femaleParent =
      req.body.femaleParent || user.families.femaleParent;
    user.families.femaleAddress =
      req.body.femaleAddress || user.families.femaleAddress;
    user.families.agreementDate =
      req.body.agreementDate || user.families.agreementDate;
    user.families.agreementPlace =
      req.body.agreementPlace || user.families.agreementPlace;

    await user.save();

    res.json({
      success: "create user family updated",
    });
  } catch (err) {
    next(err);
  }
};

// const createUserFamily = async (req, res, next) => {
//   try {
//     // karena 2 model digunakan jadi harus saling berkaitan
//     // jika tambah review keduanya harus sama
//     const session = await Family.startSession();

//     const {
//       maleName,
//       maleParent,
//       maleAddress,
//       receptionDate,
//       receptionPlace,
//       femaleName,
//       femaleParent,
//       femaleAddress,
//       agreementDate,
//       agreementPlace,
//     } = req.body;

//     // create review id manually because it is needed also for saving in Product collection
//     const ObjectId = require("mongodb").ObjectId;
//     let familyId = ObjectId();

//     session.startTransaction();
//     await Family.create(
//       [
//         {
//           _id: familyId,
//           maleName: maleName,
//           maleParent: maleParent,
//           maleAddress: maleAddress,
//           receptionDate: receptionDate,
//           receptionPlace: receptionPlace,
//           femaleName: femaleName,
//           femaleParent: femaleParent,
//           femaleAddress: femaleAddress,
//           agreementDate: agreementDate,
//           agreementPlace: agreementPlace,
//           user: {
//             _id: req.user._id,
//             name: req.user.name + " " + req.user.lastName,
//           },
//         },
//       ],
//       { session: session }
//     );

//     // populate = auto field ref on product
//     const user = await User.findById(req.user._id)
//       .populate("families")
//       .session(session);

//     // res.send(product)
//     // simpan review ke product model
//     user.families.push(familyId);

//     await user.save();

//     await session.commitTransaction();
//     session.endSession();
//     res.send("data family created");
//   } catch (err) {
//     await session.abortTransaction();
//     next(err);
//   }
// };

module.exports = {
  adminDeleteFamily,
  adminUpdateUserFamily,
  getFamilyById,
  createUserFamily,
};
