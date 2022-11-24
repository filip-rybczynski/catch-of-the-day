export function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function rando<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
}

export const splitAndCapitalize = (storeName: string) => {
  return storeName.split("-").map(capitalize).join(" ");
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};