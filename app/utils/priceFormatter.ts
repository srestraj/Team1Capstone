const formatter = (price: number, currencyCode: string = "CAD") => new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: currencyCode,
}).format(price);

export default formatter;