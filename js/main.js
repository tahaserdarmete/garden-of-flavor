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
  // Hangi sayfada olduğumuza karar ver
  if (
    window.location.pathname === "/" || // Netlify için
    window.location.pathname.includes("index.html") // Local için
  ) {
    // Loader'ı render et
    renderLoader();
    setTimeout(() => {
      // menu elemanlarını dinamik şekilde render et
      renderMenuCard(menuData);
    }, 2000);
    // Kategori butonlarına event ekle
    uiElements.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedCategory = button.id;
        const filteredMenu = menuData.filter(
          (item) => item.category == selectedCategory
        );
        if (selectedCategory == "all") {
          renderMenuCard(menuData);
        } else {
          renderMenuCard(filteredMenu);
        }
      });
    });
  } else {
    // Url'deki parametreye eriş
    const params = new URLSearchParams(window.location.search);
    // Ürünün ID'sini number veri tipine dönüştür
    const itemId = Number(params.get("id"));
    // menuData içerisinde itemID'ye sahip elemanı bul
    const product = menuData.find((item) => item.id == itemId);
    // Eğer product yoksa not-found sayfasını renderla
    if (!product) {
      renderNotFound();
    } else {
      // Bulunan product'a göre arayüzü renderla
      renderDetailPage(product);
    }
  }
});
