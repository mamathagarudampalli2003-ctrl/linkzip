import axios from "axios";

const API =
  "http://localhost:8000/api/payment";

// ================= CREATE ORDER =================

export const createOrder = async (
  plan,
  token
) => {

  const res = await axios.post(
    `${API}/create-order`,
    {
      plan,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// ================= VERIFY PAYMENT =================

export const verifyPayment =
  async (
    paymentData,
    token
  ) => {

    const res =
      await axios.post(
        `${API}/verify-payment`,
        paymentData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= BILLING HISTORY =================

export const getBillingHistory =
  async (token) => {

    const res =
      await axios.get(
        `${API}/history`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= BILLING DETAILS =================

export const getBillingDetails =
  async (token) => {

    const res =
      await axios.get(
        `${API}/details`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };