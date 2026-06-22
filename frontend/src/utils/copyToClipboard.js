const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);

    return {
      success: true,
      message: "Copied successfully ✅",
    };
  } catch (err) {
    console.error("Copy failed", err);

    return {
      success: false,
      message: "Failed to copy ❌",
    };
  }
};

export default copyToClipboard;