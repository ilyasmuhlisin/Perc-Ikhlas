const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const getProducts = async (req, res, next) => {
  try {
    // filter price
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      // $lte perintah khusus mongodb jika harga difilter tidak ada
      // maka ditampilkan harga yang lebih rendah
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
      // query = { price: { $lte: Number(req.query.price) } };
    }
    // let ratingQueryCondition = {};
    // if (req.query.rating) {
    //   queryCondition = true;
    //   ratingQueryCondition = {
    //     rating: { $in: req.query.rating.split(",") },
    //   };
    // }

    // search dari navbar
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      // nama category terdapat /
      let a = categoryName.replaceAll(",", "/");
      // let a = categoryName.replaceAll("/");
      // misal /^ssss/ ^awalan string
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }

    // search dari produk page filter
    if (req.query.category) {
      queryCondition = true;
      // memisahkan value dengan , a,b
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        // perintah spesial $in mongo db value lebih dari satu a,b
        category: { $in: a },
      };
    }

    if (queryCondition) {
      query = {
        $and: [priceQueryCondition, categoryQueryCondition],
      };
    }

    // pagination
    // jika query tidak ada set ke 1
    const pageNum = Number(req.query.pageNum) || 1;
    // res.json({pageNum})

    // sort dari nama dll.
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      // karena value di FE name_1 maka dipisahkan
      let sortOpt = sortOption.split("_");
      // untuk membuat key dinamis memerlukan kurung persegi
      // index 0 sebelum underscore index 1 setelah underscore
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
      console.log(sort);
    }
    // mengetahui berapa data product didatabase
    const totalProducts = await Product.countDocuments(query);
    // mendapatkan produk denga urutan 1 = asc dan dilimit pagination
    const products = await Product.find(query)
      // skip yang ditampilkan misalnya pageNum bernilai 1 - 1 maka 0 sehingga dikali 0 ttp 0
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
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
