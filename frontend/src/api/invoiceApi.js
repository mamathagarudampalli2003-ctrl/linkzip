import axios from "axios";

const API =
  "https://linkzip-0w52.onrender.com/api/invoice";

export const downloadInvoice =
  async (token) => {

    const response =
      await axios.get(
        `${API}/download`,
        {
          responseType:
            "blob",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};