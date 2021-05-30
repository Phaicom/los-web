const formatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

export const currencyFormatter = (num: number): string => {
  return formatter.format(num);
};

export const cardTextFormatter = (text: string, length = 54): string => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  } else {
    return text;
  }
};
