import { useSelector } from "react-redux";

useSelector;
const Header = () => {
  const flightState = useSelector((store) => store.flightReducer);
  console.log(flightState);

  return (
    <header>
      <div>
        <img src="/plane-logo.png" alt="" />
        <h3>Uçuş Radarı</h3>
      </div>
      <p>
        {flightState.isLoading
          ? "uçuşlar hesaplanıyor..."
          : flightState.isError
          ? "üzgünüz bir hata olştu"
          : flightState.flights.length + " uçuş bulundu"}
      </p>
    </header>
  );
};

export default Header;
