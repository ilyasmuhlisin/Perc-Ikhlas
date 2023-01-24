const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");

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

const getProductById = async (req, res, next) => {
  try {
    // didalam detail produk menampilkan ulasan sesuai id
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const getBestsellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      // sortir berdasarkan category ascend dan penjualan desc
      { $sort: { category: 1, sales: -1 } },
      {
        // mengelompokan berdasrkan kategori diperlukan sorting untuk menjalankan
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      // menghilangkan
      { $replaceWith: "$doc_with_max_sales" },
      { $match: { sales: { $gt: 0 } } },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      { $limit: 3 },
    ]);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort({ category: 1 })
      // hanya name price category yang dibutuhkan
      .select("name price category");
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "product removed" });
  } catch (err) {
    next(err);
  }
};

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  try {
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResult = imageValidate(req.files.images);
    if (validateResult.error) {
      return res.status(400).send(validateResult.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectory = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );

    let product = await Product.findById(req.query.productId).orFail();

    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      //console.log(path.extname(image.name))
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectory + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });
      // move
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }

    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  try {
    // mennafsirkan kode dari encode frontend
    const imagePath = decodeURIComponent(req.params.imagePath);
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    // filesystem
    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      // spesial sintaks update mongo
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    // tidak ingin mengembalikan respom apapum
    return res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getBestsellers,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
