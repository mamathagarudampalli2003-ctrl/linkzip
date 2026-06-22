import {
  useEffect,
  useState,
} from "react";

import {
  getBillingHistory,
} from "../api/billingApi";

export default function useBilling() {

  const [billing,
    setBilling] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchBilling();

  }, []);

  const fetchBilling =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const data =
          await getBillingHistory(
            token
          );

        setBilling(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return {
    billing,
    loading,
    fetchBilling,
  };
}