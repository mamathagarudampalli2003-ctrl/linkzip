import axios from "axios";

const API =
  "http://localhost:8000/api/invoice";

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