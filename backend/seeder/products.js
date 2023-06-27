const products = [
  {
    name: "A-001 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 900,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a1-1.jpg" },
      { path: "/images/products/a1-2.jpg" },
      { path: "/images/products/a1-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "A-002 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 900,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a2-1.jpg" },
      { path: "/images/products/a2-2.jpg" },
      { path: "/images/products/a2-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "A-003 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 900,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a3-1.jpg" },
      { path: "/images/products/a3-2.jpg" },
      { path: "/images/products/a3-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "A-004 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 900,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a4-1.jpg" },
      { path: "/images/products/a4-2.jpg" },
      { path: "/images/products/a4-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "A-005 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 1000,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a5-1.jpg" },
      { path: "/images/products/a5-2.jpg" },
      { path: "/images/products/a5-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Foto" }],
  },
  {
    name: "A-006 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas biasa dan hanya menggunakan 1 warna.",
    count: 9999,
    price: 900,
    category: "Kertas Biasa",
    images: [
      { path: "/images/products/a6-1.jpg" },
      { path: "/images/products/a6-2.jpg" },
      { path: "/images/products/a6-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "B-001 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1500,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b1-1.jpg" },
      { path: "/images/products/b1-2.jpg" },
      { path: "/images/products/b1-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "4 Warna" },
      { key: "Tambahan", value: "Foto" },
    ],
  },
  {
    name: "B-002 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1500,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b2-1.jpg" },
      { path: "/images/products/b2-2.jpg" },
      { path: "/images/products/b2-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "4 Warna" },
      { key: "Tambahan", value: "Foto" },
    ],
  },
  {
    name: "B-003 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1500,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b3-1.jpg" },
      { path: "/images/products/b3-2.jpg" },
      { path: "/images/products/b3-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "4 Warna" },
      { key: "Tambahan", value: "Foto" },
    ],
  },
  {
    name: "B-004 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1200,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b4-1.jpg" },
      { path: "/images/products/b4-2.jpg" },
      { path: "/images/products/b4-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "4 Warna" },
      { key: "Tambahan", value: "Tanpa Foto" },
    ],
  },
  {
    name: "B-005 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1200,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b5-1.jpg" },
      { path: "/images/products/b5-2.jpg" },
      { path: "/images/products/b5-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "1 Warna" },
      { key: "Tambahan", value: "Tanpa Foto" },
    ],
  },
  {
    name: "B-006 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas lumayan tebal serta mengkilap dengan kombinasi 4 warna atau 1 warna.",
    count: 9999,
    price: 1200,
    category: "Kertas Film",
    images: [
      { path: "/images/products/b6-1.jpg" },
      { path: "/images/products/b6-2.jpg" },
      { path: "/images/products/b6-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [
      { key: "Warna", value: "4 Warna" },
      { key: "Tambahan", value: "Tanpa Foto" },
    ],
  },
  {
    name: "C-001 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1200,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c1-1.jpg" },
      { path: "/images/products/c1-2.jpg" },
      { path: "/images/products/c1-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "C-002 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1500,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c2-1.jpg" },
      { path: "/images/products/c2-2.jpg" },
      { path: "/images/products/c2-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "C-003 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1200,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c3-1.jpg" },
      { path: "/images/products/c3-2.jpg" },
      { path: "/images/products/c3-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "C-004 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1500,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c4-1.jpg" },
      { path: "/images/products/c4-2.jpg" },
      { path: "/images/products/c4-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
  {
    name: "C-005 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1500,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c5-1.jpg" },
      { path: "/images/products/c5-2.jpg" },
      { path: "/images/products/c5-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Foto" }],
  },
  {
    name: "C-006 Undangan atau Ulem",
    description:
      "Kartu undangan pernikahan dibuat dengan kertas jadi, warna dan desain tetap.",
    count: 9999,
    price: 1250,
    category: "Kertas Jadi",
    images: [
      { path: "/images/products/c6-1.jpg" },
      { path: "/images/products/c6-2.jpg" },
      { path: "/images/products/c6-3.jpg" },
    ],
    reviewsNumber: 5,
    reviews: [],
    attrs: [{ key: "Tambahan", value: "Tanpa Foto" }],
  },
];

module.exports = products;
