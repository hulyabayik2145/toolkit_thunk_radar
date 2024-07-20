import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store.flightReducer);
  // gösterilecek ilk elemanı belirle,state de tutuyoruz
  const [itemOffset, setItemOffset] = useState(0);
  //sayfa başına gösterilecek eleman sayısı tanımla

  const itemsPerPage = 10;
  // son gösterilecek elaman
  const endOffset = itemOffset + itemsPerPage;
  //belirlenen aralıktaki elamanları alır
  const currentItems = flightState.flights.slice(itemOffset, endOffset);
  //maksimum sayfa sayısını belirle
  const pageCount = Math.ceil(flightState.flights.length / itemsPerPage);

  // Invoke when user click to request another page.
  //her yeni sayfa seçildiğinde çalışır
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % flightState.flights.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th>Boylam</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.slice(0, 10).map((i) => (
            <tr>
              <td>{i.id}</td>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button onClick={() => setDetailId(i.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        className="pagination"
        previousLabel="< onceki"
        nextLabel="sonraki >"
      />
    </div>
  );
};

export default ListView;
