export interface Category {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  emoji: string;
  image: string;
  iconClass?: string;
}

export const categories: Category[] = [
  { id: "dresses", name: "Dresses", slug: "dresses", itemCount: 70, emoji: "👗", image: "https://i.ibb.co/ZRzKHy59/dress.png" },
  { id: "two-pieces", name: "Two-Pieces", slug: "two-pieces", itemCount: 70, emoji: "👚", image: "https://i.ibb.co/LhZGMnf8/suit.png" },
  { id: "shoes", name: "Shoes", slug: "shoes", itemCount: 70, emoji: "👠", image: "https://i.ibb.co/YFW3J1rF/high-heels.png" },
  { id: "handbags", name: "Handbags", slug: "handbags", itemCount: 70, emoji: "👜", image: "https://i.ibb.co/JRgCLzRF/handbag.png" },
  {
    id: "jewelry",
    name: "Jewelry",
    slug: "jewelry",
    itemCount: 70,
    emoji: "💍",
    image: "https://i.ibb.co/Fk25GMdb/images-removebg-preview-2.png"
  }
];
