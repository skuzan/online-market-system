const onlineStore = {
  products: [
    {
      name: "ACER Nitro ANV15-51-5648/ Intel I5-13420H/ 8GB Ram/ 1TB SSD/ RTX 3050/ 15.6''/ W11",
      price: 36999,
      stock: 10,
      category: "Laptop",
    },

    {
      name: "ACER Aspire Lite 16/Core i5-1235U/8GB RAM /512 GB SSD/16''/ Win 11H",
      price: 20999,
      stock: 2,
      category: "Laptop",
    },

    {
      name: "SAMSUNG Galaxy Tab A9+ 8/128GB Tablet Mistik Gümüş",
      price: 7999,
      stock: 5,
      category: "Tablet",
    },

    {
      name: "LENOVO Tab M11 LTE 11 inç 8/128GB Folio Kılıf+ Kalem Tablet",
      price: 9999,
      stock: 2,
      category: "Tablet",
    },
    {
      name: "HP LaserJet M111w Yazıcı Beyaz",
      price: 6399,
      stock: 5,
      category: "Yazıcı",
    },
    {
      name: "EPSON L8050 EcoTank Renkli Tanklı Fotoğraf Yazıcısı",
      price: 17999,
      stock: 3,
      category: "Yazıcı",
    },
    {
      name: "LOGITECH G G733 Kablosuz Oyuncu Kulaklığı Beyaz",
      price: 7999,
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
      name,
      price,
      stock,
      category,
    });
    console.log("--------------------------------");
    console.log(`${name} ürünü başarıyla eklendi.`);
  },

  // ? 2- addToCart
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
    console.log("--------------------------------");
    console.log(`${quantity} adet ${name} sepete eklendi.`);
    this.calculateTotal();
    console.log(`Kalan Stok : ${product.stock}`);
  },

  // ? 3- removeFromCart
  //----------------------------------------

  removeFromCart(name, quantity) {
    const removeproduct = this.card.find(
      (item) => item.name.toUpperCase() === name.toUpperCase()
    );

    if (!removeproduct) {
      console.log("--------------------------------");
      console.log(`"${name}" isimli ürün sepette bulunamadı.`);
      return;
    }
    if (removeproduct.quantity > quantity) {
      removeproduct.quantity -= quantity;
      const product = this.products.find((item) => item.name === name);
      if (product) {
        product.stock += quantity;
        console.log(`${quantity} adet ${name} sepetten çıkarıldı.`);
        this.calculateTotal();
      }
    } else {
      this.card = this.card.filter((item) => item.quantity > 0);
      const product = this.products.find((item) => item.name === name);
      if (product) {
        product.stock += removeproduct.quantity;
        console.log("--------------------------------");
        console.log(
          `${removeproduct.quantity} adet ${name} sepetten çıkarıldı (tamamı).`
        );
      }
      this.calculateTotal();
    }
  },

  // ? 4- calculateTotal
  //----------------------------------------

  calculateTotal() {
    this.totalCartPrice = this.card.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log(`Sepet Toplamı : ${this.totalCartPrice} ₺`);
  },

  // ? 5- listCard
  //----------------------------------------

  listCard() {
    console.log("----------------");
    console.log("Sepeti Görüntüle");
    this.card.forEach((item) => {
      console.log(
        `Ürün Adı : ${item.name} Ürün miktarı : ${item.quantity} adet, Fiyat : ${item.price}₺`
      );
    });
    this.calculateTotal();
  },

  // ? 6- listProductsByCategory(category)
  //----------------------------------------
  listProductsByCategory(category) {
    const searchCategory = this.products.filter(
      (item) => item.category.toUpperCase() === category.toUpperCase()
    );
    if (searchCategory.length > 0) {
      console.log("-----------------------------------");
      console.log(`${category} kategorisi Ürün Listesi`);
      searchCategory.forEach((item) => {
        console.log(
          `${item.name} => Fiyat : ${item.price}₺, Stok Miktarı : ${item.stock}`
        );
      });
    } else {
      console.log("-----------------------------------");
      console.log(`Bu kategoride ürün bulunmamaktadır.`);
    }
  },
};

onlineStore.addProduct(
  "LENOVO IdeaPad Slim 3/AMD Ryzen 7 5825U/16GB RAM/512GB SSD/15.6 FHD/W11",
  29.999,
  5,
  "Laptop"
);

onlineStore.addToCart("HP LaserJet M111w Yazıcı Beyaz", 3);
onlineStore.addToCart(
  "ACER Aspire Lite 16/Core i5-1235U/8GB RAM /512 GB SSD/16''/ Win 11H",
  1
);

onlineStore.removeFromCart("HP LaserJet M111w Yazıcı Beyaz", 1);

onlineStore.addToCart("HP LaserJet M111w Yazıcı Beyaz", 5);

onlineStore.listCard();

onlineStore.listProductsByCategory("Laptop");
