// Arayüzden eleman çekme işlmini bir obje içerisinde yap
const uiElements = {
  menuList: document.querySelector("#menu-list"),
};

// Menu elemanı render edecek fonksiyon

const renderMenuCard = (data) => {
  console.log(data);
  // Dışarıdan alınan datanın içerisindeki her eleman için bir html oluştur.
  uiElements.menuList.innerHTML = data
    .map(
      (item) => `
        <a href="/detail.html?id=${
          item.id
        }" class="col-md-6 col-lg-4 mb-4 text-decoration-none">
            <div class="card menu-card">
              <div class="position-relative">
                <img
                  src="${item.img}"
                  class="card-img-top"
                  alt="menu-image"
                />
                <span
                  class="badge bg-success position-absolute top-0 start-0 m-3 px-3 py-2 text-capitalize menu-card-badge"
                  >${item.category}</span
                >
                <span
                  class="badge bg-white text-success fw-bold position-absolute top-0 end-0 m-3 px-3 py-2 menu-card-price"
                  >$${item.price.toFixed(2)}</span
                >
              </div>
              <div class="card-body">
                <h5 class="card-title fw-bold text-success mb-2">${
                  item.title
                }</h5>
              </div>
            </div>
          </a>`
    )
    .join("");
  // renderMenuCard fonksiyonunu verilen data bir dizidir. Bu dizinin dönülmesi ile elde edilen elemansa yine bir dizidir. Bu elde edilen dizi arayüze aktarıldığında elemanlar arasındaki "," arayüzde bozulmaya sebep olur. Çünkü dizi elemanları "," ile ayrılır. Bu bozulmayı düzeltmek içinse dizinin elemanları join metodu kullanılarak boşluğa göre böleriz.
};

export {uiElements, renderMenuCard};
