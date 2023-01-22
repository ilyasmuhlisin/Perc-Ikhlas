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

    // filter by atribut
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ]
      // acc nilai sebelumnya = kosong + item nilai selanjutnya
      // reduce perulangan dalm array
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // removes first item
          let a1 = {
            // $elemMath perintah mongoDb entuk mencocokan key field pertama dengan value field kedua
            // [Tipe , foto, tanpa foto]
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          // console.dir(acc, { depth: null })
          return acc;
        } else return acc;
        // nilai awal array kosong
      }, []);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
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

    // search by searchbox
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      // menambahkan field score akurasi pencarian
      select = {
        score: { $meta: "textScore" },
      };
      // mengurutkan berdasarkan akurasi
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          categoryQueryCondition,
          ...attrsQueryCondition,
          searchQueryCondition,
        ],
      };
    }

    // mengetahui berapa data product didatabase
    const totalProducts = await Product.countDocuments(query);
    // mendapatkan produk denga urutan 1 = asc dan dilimit pagination
    const products = await Product.find(query)
      .select(select)
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
