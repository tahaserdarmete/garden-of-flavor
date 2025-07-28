import getMenu from "./api.js";
import {
  renderDetailPage,
  renderLoader,
  renderMenuCard,
  renderNotFound,
  uiElements,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Api isteği at
  const menuData = await getMenu();

  // Hangi sayfada olduğumuza karar ver. Anasayfaysak buna göre işlemler detay sayfasındaysak buna göre işlemler yapacağız.
  if (window.location.pathname.includes("/index.html")) {
    // Loader'ı render et
    renderLoader();

    setTimeout(() => {
      // menu elemanlarını dinamik şekilde render et
      renderMenuCard(menuData);
    }, 2000);

    // uiElements.categoryButtons bir nodeList olduğundan buna addEventListener eklyemeyiz. Bunun için nodeList içerisindeki her bir elemanı teker teker erişip addEventListener ekleyeceğiz.
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Butona tıklanınca butonun ID'sine eriş
        const selectedCategory = button.id;

        // menuData içerisindeki selected Category sahip elemanlara eriş

        const filteredMenu = menuData.filter(
          (item) => item.category == selectedCategory
        );

        console.log(filteredMenu);

        // Filtrelenen ürünlere göre menü listesini renderla. Eğer seçili kategori all' a eşitse tüm ürünleri renderla ama all haricinde bir değere eşitse o kategorideki ürünleri renderla.

        if (selectedCategory == "all") {
          renderMenuCard(menuData);
        } else {
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    // Url'deki parametreye eriş
    // ! UrlSearchParams Js içerisinde yer alan bir classtır. Url'e geçilen parametreleri kolay bir şekilde yönetmemizi sağlar.
    const params = new URLSearchParams(window.location.search);

    // Ürünün ID'sini number veri tipine dönüştür ve bir değişkene aktar.
    const itemId = Number(params.get("id"));

    //menuData içerisinde itemID'ye sahip elemanı bul
    const product = menuData.find((item) => item.id == itemId);

    // Eğer product yoksa not-found sayfasını renderla
    if (!product) {
      renderNotFound();
    } else {
      // Bulunan product' a göre arayüzü renderla
      renderDetailPage(product);
    }
  }
});
