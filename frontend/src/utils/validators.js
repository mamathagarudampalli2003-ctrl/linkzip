// ================= URL VALIDATION =================

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ================= EMAIL VALIDATION =================

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

// ================= PASSWORD VALIDATION =================

export const isStrongPassword = (
  password
) => {
  return password.length >= 6;
};

// ================= CUSTOM ID VALIDATION =================

export const isValidCustomId = (
  customId
) => {
  return /^[a-zA-Z0-9_-]+$/.test(
    customId
  );
};

// ================= EMPTY CHECK =================

export const isEmpty = (value) => {
  return (
    !value ||
    value.trim().length === 0
  );
};