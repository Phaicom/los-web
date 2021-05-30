const formatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

export const currencyFormatter = (num: number): string => {
  return formatter.format(num);
};

export const cardTextFormatter = (text: string): string => {
  if (text.length > 54) {
    return text.substring(0, 50) + "...";
  } else {
    return text;
  }
};
