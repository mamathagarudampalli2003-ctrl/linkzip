import axios from "axios";

const API =
  "http://localhost:8000/api/payment";

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