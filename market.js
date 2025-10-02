const onlineStore = {
  products: [
    {
      name: "ACER Nitro ANV15-51-5648/ Intel I5-13420H/ 8GB Ram/ 1TB SSD/ RTX 3050/ 15.6''/ W11",
      price: 36.999,
      stock: 10,
      category: "Laptop",
    },

    {
      name: "ACER Aspire Lite 16/Core i5-1235U/8GB RAM /512 GB SSD/16''/ Win 11H",
      price: 20.999,
      stock: 2,
      category: "Laptop",
    },

    {
      name: "SAMSUNG Galaxy Tab A9+ 8/128GB Tablet Mistik Gümüş",
      price: 7.999,
      stock: 5,
      category: "Tablet",
    },

    {
      name: "LENOVO Tab M11 LTE 11 inç 8/128GB Folio Kılıf+ Kalem Tablet",
      price: 9.999,
      stock: 2,
      category: "Tablet",
    },
    {
      name: "HP LaserJet M111w Yazıcı Beyaz",
      price: 6.399,
      stock: 5,
      category: "Yazıcı",
    },
    {
      name: "EPSON L8050 EcoTank Renkli Tanklı Fotoğraf Yazıcısı",
      price: 17.999,
      stock: 3,
      category: "Yazıcı",
    },
    {
      name: "LOGITECH G G733 Kablosuz Oyuncu Kulaklığı Beyaz",
      price: 7.999,
      stock: 5,
      category: "Kulaklık",
    },
  ],

  card: [],

  totalCartPrice: 0,

  // ? 1- addProduct
  //----------------------------------------

  addProduct(name, price, stock, category) {
    this.products.push({
      name: name,
      price: price,
      stock: stock,
      category: category,
    });
  },

  // ? 1- addToCart
  //----------------------------------------

  addToCart(name, quantity) {
    const product = this.products.find(
      (item) => item.name.toUpperCase() === name.toUpperCase()
    );
    if (!product) {
      console.log(`${name} ürünü mağazada bulunamadı.`);
      return;
    }

    if (product.stock < quantity) {
      console.log(`Yetersiz stok! Mevcut stok : ${product.stock}`);
      return;
    }

    const cardItem = this.card.find(
      (item) => item.name.toUpperCase() === name.toUpperCase()
    );
    if (cardItem) {
      cardItem.quantity += quantity;
    } else {
      this.card.push({
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
    }
    product.stock -= quantity;
    this.totalCartPrice = this.card.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log(`${quantity} adet ${name} sepete eklendi.`);
    console.log(`Sepet Toplamı : ${this.totalCartPrice} ₺`);
    console.log(`Kalan Stok : ${product.stock}`);
  },
};

onlineStore.addProduct(
  "LENOVO IdeaPad Slim 3/AMD Ryzen 7 5825U/16GB RAM/512GB SSD/15.6 FHD/W11",
  29.999,
  5,
  "Laptop"
);

onlineStore.addToCart("HP LaserJet M111w Yazıcı Beyaz", 2);
onlineStore.addToCart("HP LaserJet M111w Yazıcı Beyaz", 2);
