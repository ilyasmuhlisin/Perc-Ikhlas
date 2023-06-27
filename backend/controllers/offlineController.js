const Offline = require("../models/OfflineOrdersModel");
const Family = require("../models/FamilyModel");
const User = require("../models/UserModel");
// const ObjectId = require("mongodb").ObjectId;

const getOfflineOrdersById = async (req, res, next) => {
  try {
    // didalam detail produk menampilkan ulasan sesuai id
    const offlines = await Offline.findById(req.params.id).orFail();
    res.json(offlines);
  } catch (err) {
    next(err);
  }
};

// mendapatkan order offline
const adminGetOfflineOrders = async (req, res, next) => {
  try {
    const offlines = await Offline.find({});
    return res.json(offlines);
  } catch (err) {
    next(err);
  }
};

// membuat order offline
const adminCreateOfflineOrders = async (req, res, next) => {
  try {
    const offlinex = new Offline();
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

    offlinex.maleName = maleName;
    offlinex.maleParent = maleParent;
    offlinex.maleAddress = maleAddress;
    offlinex.receptionDate = receptionDate;
    offlinex.receptionPlace = receptionPlace;
    offlinex.femaleName = femaleName;
    offlinex.femaleParent = femaleParent;
    offlinex.femaleAddress = femaleAddress;
    offlinex.agreementDate = agreementDate;
    offlinex.agreementPlace = agreementPlace;

    await offlinex.save();

    res.json({
      message: "offline orders created",
      offlineId: offlinex._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminDeleteOffline = async (req, res, next) => {
  try {
    const offline = await Offline.findById(req.params.id).orFail();
    await offline.remove();
    res.json({ message: "offline orders removed" });
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

const adminUpdateOfflineOrders = async (req, res, next) => {
  try {
    const offline = await Offline.findById(req.params.id).orFail();
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

    offline.maleName = maleName || offline.maleName;
    offline.maleParent = maleParent || offline.maleParent;
    offline.maleAddress = maleAddress || offline.maleAddress;
    offline.receptionDate = receptionDate || offline.receptionDate;
    offline.receptionPlace = receptionPlace || offline.receptionPlace;
    offline.femaleName = femaleName || offline.femaleName;
    offline.femaleParent = femaleParent || offline.femaleParent;
    offline.femaleAddress = femaleAddress || offline.femaleAddress;
    offline.agreementDate = agreementDate || offline.agreementDate;
    offline.agreementPlace = agreementPlace || offline.agreementPlace;

    await offline.save();
    res.json({
      message: "offline orders updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  adminDeleteOffline,
  adminUpdateOfflineOrders,
  getOfflineOrdersById,
  adminGetOfflineOrders,
  adminCreateOfflineOrders,
};
