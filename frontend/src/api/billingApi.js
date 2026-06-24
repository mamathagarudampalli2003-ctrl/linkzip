import axios from "axios";

const API =
  "https://linkzip-0w52.onrender.com/api/payment";

export const getBillingHistory =
  async (token) => {

    const res =
      await axios.get(
        `${API}/billing-history`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
};