import { capitalize } from "../../../../../../../helpers";

export function rando<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

export function generateName(length = 2) {
    const adjectives = [
      "adorable",
      "amazing",
      "beautiful",
      "breathtaking",
      "classy",
      "cool",
      "darling",
      "delicious",
      "elegant",
      "electrifying",
      "extreme",
      "fancy",
      "fantastic",
      "fierce",
      "fun",
      "great",
      "glamorous",
      "hilarious",
      "hearty",
      "lovely",
      "long",
      "magnificent",
      "magic",
      "organic",
      "otherworldly",
      "playful",
      "peppy",
      "pretty",
      "quaint",
      "sparkling",
      "spectacular",
      "splendid",
      "terrific",
      "tasty",
      "unreal",
      "unbelievable",
      "vast",
      "vicious",
      "wacky",
      "wonderful",
      "zany",
    ];
  
    const fish = [
      "anchovies",
      "anglerfish",
      "barracudas",
      "bass",
      "blobfish",
      "catfish",
      "carps",
      "cods",
      "crabs",
      "dragonfish",
      "eels",
      "flounders",
      "guppies",
      "haddocks",
      "herrings",
      "jellyfish",
      "krills",
      "lionfish",
      "lobsters",
      "megalodons",
      "muraenas",
      "oysters",
      "piranhas",
      "pollocks",
      "pufferfish",
      "salmons",
      "sardines",
      "seahorses",
      "sharks",
      "starfish",
      "stingrays",
      "trouts",
      "tunas",
    ];
  
    return Array<string | null>(length).fill(null)
      .map((_, i) => {
        return i < length - 1 ? rando(adjectives) : rando(fish);
      })
      .map(capitalize)
      .join(" ");
  }