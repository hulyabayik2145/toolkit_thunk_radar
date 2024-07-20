import moment from "moment/moment";
import "moment/locale/tr";

// unix formatındaki veriyi normal formata çevirmek için

const formatDate = (unix_time) => {
  // unix formattaki saniye verisini date ile kullanabilmek için 1000 ile çarpıpmilisaniyeye çevirdik
  const date = new Date(unix_time * 1000);

  // tarihi moment ile formatlıyoruz
  return moment(date).calendar();
};

export default formatDate;
