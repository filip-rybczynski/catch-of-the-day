export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "adorable",
    "beautiful",
    "clean",
    "drab",
    "elegant",
    "fancy",
    "gullible",
    "hilarious",
    "long",
    "magnificent",
    "old-fashioned",
    "plain",
    "quaint",
    "sparkling",
    "ugly",
    "unsightly",
    "angry",
    "bewildered",
    "clumsy",
    "defeated",
    "embarrassed",
    "fierce",
    "grumpy",
    "helpless",
    "itchy",
    "jealous",
    "lazy",
    "mysterious",
    "nervous",
    "obnoxious",
    "panicky",
    "regretful",
    "scary",
    "thoughtless",
    "uptight",
    "worried"
  ];

  const fish = [
    "anchovies",
    "anglerfish",
    "barracudas",
    "blobfish",
    "catfish",
    "carps",
    "cods",
    "dragonfish",
    "eels",
    "flounders",
    "guppies",
    "haddocks",
    "herrings",
    "jellyfish",
    "krills",
    "lionfish",
    "megalodons",
    "oysters",
    "piranhas",
    "pufferfish",
    "salmons",
    "sardines",
    "seahorses",
    "sharks",
    "starfish",
    "stingrays",
    "tunas",
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(fish)}`;
}
