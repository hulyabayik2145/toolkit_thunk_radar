import axios from "axios";
import { useEffect, useState } from "react";
import { headerOpt } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlices";
import { useDispatch } from "react-redux";

const Modal = ({ detailId, close }) => {
  // detay verisini sadece bu modal içerisinde kullanacağmız ve başka bir bileşende kullanmayacağımız için state olarak tuttuk
  const [d, setDetail] = useState(null);

  const dispatch = useDispatch();
  //id her güncellendiğinde çalışır
  useEffect(() => {
    //her useefect çalıştığında onceki uçusun verilerini temizle
    setDetail(null);
    //yeni uçusun detay verilerini al

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));

        setDetail(res.data);
      })

      .catch((err) => console.log(err));
  }, [detailId]);
  // console.log(d);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <button onClick={close}>X</button>
        </p>
        {!d ? (
          <div className="wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : !d.aircraft?.model || !d.airport.origin || !d.aircraft?.model ? (
          <div>
            <p>Bu uçusun verileri gizlidir</p>
          </div>
        ) : (
          <>
            <h2>{d.aircraft.model.text}</h2>
            <h2>{d.aircraft.model.code}</h2>
            <p>
              <span>Kuyruk Kodu</span>
              <span>{d.aircraft.registration}</span>
            </p>
            <img src={d.aircraft.images.large[0].src} alt="" />
            <p>
              <span>Şirket </span>
              <span>{d.airline.short}</span>
            </p>
            <p>
              <span>Kalkış </span>
              <a
                target="_blank" //
                href={d.airport.origin?.website}
              >
                {d.airport.origin.name} (
                {d.airport.origin.position.country.name})
              </a>
            </p>
            <p>
              <span>Varış </span>
              <a
                target="_blank" //
                href={d.airport.origin?.website}
              >
                {d.airport.destination?.name} (
                {d.airport.destination?.position.country.name}
              </a>
            </p>
            <p>
              <span>Kalkış Zamanı</span>
              <span>{formatDate(d.time.scheduled.departure)}</span>
            </p>
            <p>
              <span>Varış Zamanı</span>
              <span>{formatDate(d.time.scheduled.arrival)}</span>
            </p>
            <p className={d.status.icon}>
              <span>{d.status.text}</span>
              <span></span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
