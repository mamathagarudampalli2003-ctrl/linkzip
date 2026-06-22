import { useState } from "react";
import axios from "axios";

export default function useAiAutomation() {

  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRules = async (analytics) => {

    setLoading(true);

    try {

      const res = await axios.post(
        "/api/ai/generate",
        { analytics }
      );

      setRules(res.data.rules);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return {
    rules,
    loading,
    generateRules,
  };

}