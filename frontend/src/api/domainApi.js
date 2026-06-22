import axios from "axios";

const API =
  "http://localhost:8000/api/domains";

// ================= ADD DOMAIN =================

export const addDomain =
  async (
    domain,
    token
  ) => {

    const res =
      await axios.post(
        `${API}/add`,
        {
          domain,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= GET DOMAINS =================

export const getDomains =
  async (token) => {

    const res =
      await axios.get(
        `${API}/all`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= VERIFY DOMAIN =================

export const verifyDomain =
  async (
    domain,
    verificationToken,
    token
  ) => {

    const res =
      await axios.post(
        `${API}/verify`,
        {
          domain,
          token:
            verificationToken,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= DELETE DOMAIN =================

export const deleteDomain =
  async (
    domain,
    token
  ) => {

    const res =
      await axios.delete(
        `${API}/delete`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
          data: {
            domain,
          },
        }
      );

    return res.data;
  };