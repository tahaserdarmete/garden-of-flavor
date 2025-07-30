// API  istek atacak fonksiyon

const getMenu = async () => {
  try {
    // API' ya istek at
    const response = await fetch("/db.json");

    // API' dan gelen veriyi JSON'dan JS'e çevir
    const data = await response.json();

    // Gelen veri içerisindeki menüyü return et

    return data.menu;
  } catch (error) {
    // Hata durumunda kullanıcıya bildirimde bulun
    console.log(`API Hatası:${error}`);

    // Eğer hata varsa boş dizin döndür
    return [];
  }
};

export default getMenu;
