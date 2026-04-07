const formatters = {
  card(value) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  },

  expiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length < 2) return digits;
    return digits.slice(0, 2) + " / " + digits.slice(2);
  },

  digits(value) {
    return value.replace(/\D/g, "");
  },
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-format]").forEach((input) => {
    const format = formatters[input.dataset.format];
    if (!format) return;

    input.addEventListener("input", () => {
      const cursor = input.selectionStart;
      const before = input.value.length;
      input.value = format(input.value);
      const after = input.value.length;
      input.setSelectionRange(cursor + after - before, cursor + after - before);
    });
  });
});
