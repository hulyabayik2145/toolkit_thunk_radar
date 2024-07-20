import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";
//  todo pending/fulfilled durumlarında slice sı güncelle
export const getFlights = createAsyncThunk("flights/getFlights", async () => {
    // api isteği at
    const res = await axios.request(options);
    console.log(res.data.aircraft);

    //2) gelen veriyi formatla
    // dizi içerisindeki dizileri nesnelere cevireceğiz
    const formatted = res.data.aircraft.map((item) => ({
        id: item[0],
        code: item[1],
        lat: item[2],
        lng: item[3],
    }));

    // console.log(formatted);

    // 3 aks,yonun payloadı olarak frmatlanana veriyi ekle
    return formatted;


});