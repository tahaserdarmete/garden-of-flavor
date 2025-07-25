import getMenu from "./api.js";
import {renderMenuCard} from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Api isteği at
  const menuData = await getMenu();

  // Hangi sayfada olduğumuza karar ver. Anasayfaysak buna göre işlemler detay sayfasındaysak buna göre işlemler yapacağız.
  if (window.location.pathname.includes("/index.html")) {
    console.log("Ana Sayfa");
    // menu elemanlarını dinamik şekilde render et
    renderMenuCard(menuData);
  } else {
    console.log("Detay Sayfası");
  }
});
