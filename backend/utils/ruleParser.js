export const parseRules = (rulesText) => {
  if (!rulesText) return [];

  const lines = rulesText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const rules = [];

  lines.forEach((line) => {
    const parts = line.split("->");

    if (parts.length !== 2) return;

    const condition = parts[0].trim().toLowerCase();
    const url = parts[1].trim();

    const words = condition.split(" ");

    const rule = {
      device: null,
      country: null,
      time: null,
      url,
    };

    words.forEach((word) => {
      if (word === "mobile" || word === "desktop") {
        rule.device = word;
      }

      if (word.length === 2) {
        rule.country = word.toUpperCase();
      }

      if (word === "morning" || word === "evening") {
        rule.time = word;
      }
    });

    rules.push(rule);
  });

  return rules;
};