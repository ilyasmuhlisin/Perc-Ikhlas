const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
  try {
    // jika query tidak ada set ke 1
    const pageNum = Number(req.query.pageNum) || 1;
    // res.json({pageNum})
    // mengetahui berapa data product didatabase
    const totalProducts = await Product.countDocuments({});
    // mendapatkan produk denga urutan 1 = asc dan dilimit pagination
    const products = await Product.find({})
      // skip yang ditampilkan misalnya pageNum bernilai 1 - 1 maka 0 sehingga dikali 0 ttp 0
      .skip(recordsPerPage * (pageNum - 1))
      .sort({ name: 1 })
      .limit(recordsPerPage);
    res.json({
      products,
      pageNum,
      // untuk menunjukan angka yang ditampilkan pada pagination
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getProducts;
