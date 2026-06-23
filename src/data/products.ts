// TODO: replace with real product photography if needed (currently populated with high-quality fashion assets from Unsplash)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  tags?: string[];
  subType?: string;
  colorTag?: string;
}

export const products: Product[] = [
  {
    id: "summer-floral-dress",
    name: "Summer Floral Dress",
    description: "A gorgeous, lightweight summer dress crafted from highly breathable organic cotton. Featuring an elegant A-line silhouette, delightful floral prints, and a delicately smocked bodice, it is perfect for styling with strappy sandals on sunny beach strolls or during garden tea parties.",
    price: 36000.00,
    compareAtPrice: 52000.00,
    category: "",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["#FF5790", "#004CFF", "#202020"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 284,
    tags: ["New Arrival", "Best Seller"],
    subType: "dress",
    colorTag: "#ff5790"
  },
  {
    id: "classic-heels",
    name: "Classic Leather Stiletto Heels",
    description: "Handcrafted from buttery-soft premium calfskin, these timeless stilettos feature a sleek pointed toe, a supportive memory-foam footbed, and a perfectly balanced 3.5-inch heel designed for effortless, comfortable transition from daytime business meetings to evening soirées.",
    price: 58500.00,
    compareAtPrice: 82500.00,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["#202020", "#FF5790", "#F5F5F5"],
    sizes: ["36", "37", "38", "39", "40"],
    rating: 4.7,
    reviewCount: 94,
    tags: ["Classic", "Staff Pick"]
  },
  {
    id: "leather-tote",
    name: "Premium Saffiano Leather Tote Bag",
    description: "Re-imagining a classic silhouette, this spacious tote bag features scratch-resistant Saffiano genuine leather, robust top handles, a secure zippered main compartment, a padded divider pocket designed for a 14-inch laptop, and convenient brass feet.",
    price: 97500.00,
    compareAtPrice: 142500.00,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["#5D4037", "#202020", "#c7c7c7"],
    sizes: ["One Size"],
    rating: 4.8,
    reviewCount: 165,
    tags: ["Best Seller", "Everyday"]
  },
  {
    id: "white-sneakers",
    name: "Urban Minimalist Leather Sneakers",
    description: "Clean, understated, and versatile sneakers crafted with a premium full-grain leather upper, metal eyelets, detailed marginal stitching, and a durable vulcanized rubber cupsole. Features an antibacterial Ortholite insole for supreme day-long walking convenience.",
    price: 48000.00,
    compareAtPrice: 67500.00,
    category: "",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["#F5F5F5", "#202020"],
    sizes: ["37", "38", "39", "40", "41"],
    rating: 4.7,
    reviewCount: 142,
    tags: ["Trending", "Athleisure"]
  },
  {
    id: "lace-slip-dress",
    name: "Satin Romance Lace Slip Dress",
    description: "Crafted from liquid-drape luxurious satin silk, this romantic slip dress is finished with a delicate scalloped Chantilly lace trim along the V-neckline and back cutout. Outfitted with adjustable crossover spaghetti shoulder straps for a custom fit.",
    price: 24300.00,
    compareAtPrice: 27000.00,
    category: "lingerie",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    ],
    colors: ["#FF5790", "#202020"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviewCount: 75,
    tags: ["Premium", "Lingerie Collection"],
    subType: "dress",
    colorTag: "#ff5790"
  },
  // GROUP 1: Blush Pink (#ff5790)
  {
    id: "dr-001",
    name: "Blush Lily Silk Maxi Dress",
    description: "A flowing pure silk maxi dress in elegant blush pink. Features a beautifully draped cowl neckline, a subtle side slit for leg movement, and delicate criss-cross back design that exudes timeless glamour.",
    price: 49500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 45,
    subType: "dress",
    colorTag: "#ff5790"
  },
  {
    id: "dr-014",
    name: "Rose Petal Wrap Dress",
    description: "A gorgeous premium georgette wrap dress with a beautifully fitted waist, playful ruffle details along the hem, and soft bishop sleeves. Ideal for daytime brunches or sunset cocktail hours.",
    price: 36000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 38,
    subType: "dress",
    colorTag: "#ff5790"
  },
  {
    id: "tp-002",
    name: "Pink Champagne Linen Set",
    description: "A relaxed-fit modern two-piece made from high-grade French linen. Includes a breezy cropped button-up shirt and matching high-waisted wide-leg trousers for a chic, ready-to-wear look.",
    price: 45000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 52,
    subType: "two-piece",
    colorTag: "#ff5790"
  },
  {
    id: "tp-009",
    name: "Blush Breeze Pleated Co-ord",
    description: "An elegant, lightweight plissé co-ord set in sweet blush pink. Features a loose-fit long sleeve top with detailed sleeve ruffles and high-rise elasticated palazzo trousers that glide as you walk.",
    price: 48000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 29,
    subType: "two-piece",
    colorTag: "#ff5790"
  },
  {
    id: "dr-021",
    name: "Pink Dahlia Slip Dress",
    description: "An effortless 100% fine cotton slip dress adorned with delicate lace accents along the straps and portrait back. Soft, highly breathable, and styled perfectly with single strap slippers.",
    price: 33000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviewCount: 19,
    subType: "dress",
    colorTag: "#ff5790"
  },
  {
    id: "tp-015",
    name: "Blush Knit Crop & Midi Skirt",
    description: "A premium ultra-soft knit co-ord set. Features a sculpted halter-neck knit tank top and a sleek high-waisted ribbed midi skirt that wonderfully contours your body shape.",
    price: 52000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539008835151-34340d043b35?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5790"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 41,
    subType: "two-piece",
    colorTag: "#ff5790"
  },

  // GROUP 2: Sage Green (#7a9b76)
  {
    id: "dr-003",
    name: "Sage Meadow Midi Dress",
    description: "Woven from premium cotton-linen blend in organic sage green. Features a sophisticated sweetheart neckline, a smocked back panel for a perfect bust fit, and tiered flowy skirt.",
    price: 38500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 61,
    subType: "dress",
    colorTag: "#7a9b76"
  },
  {
    id: "dr-010",
    name: "Sage Grace Satin Gown",
    description: "An elegant evening dress crafted in heavy sage satin. Boasting a beautiful cowled back cutout and adjustable thin straps, it falls effortlessly to the floor in a sleek A-line design.",
    price: 55000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1622445262465-24819af52162?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 34,
    subType: "dress",
    colorTag: "#7a9b76"
  },
  {
    id: "dr-018",
    name: "Olive-Sage Tiered Sundress",
    description: "Lightweight and fully lined sundress with pretty frilled straps and a delightful three-tiered design that makes summer styling a breezy joy.",
    price: 39000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 22,
    subType: "dress",
    colorTag: "#7a9b76"
  },
  {
    id: "tp-004",
    name: "Sage Linen Button-Up & Shorts Set",
    description: "A lovely warm-weather matching set. Features a loose-fit button-up short-sleeve shirt with wooden buttons and breezy matching shorts with a comfy elastic waist.",
    price: 42000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviewCount: 18,
    subType: "two-piece",
    colorTag: "#7a9b76"
  },
  {
    id: "tp-011",
    name: "Sage Ribbed Lounge Duo",
    description: "Extremely soft ribbed lounge set including a breathable scoop-neck crop top and matching high-waisted wide-leg lounge trousers designed for elevated home attire.",
    price: 35000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 27,
    subType: "two-piece",
    colorTag: "#7a9b76"
  },
  {
    id: "tp-020",
    name: "Econyl Sage Knit Co-ord",
    description: "An eco-friendly knitted set. Includes a luxury wrap front knit cardigan top and a matching knit midi pencil skirt with a back walking slit.",
    price: 49000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&w=600&q=80"],
    colors: ["#7a9b76"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 30,
    subType: "two-piece",
    colorTag: "#7a9b76"
  },

  // GROUP 3: Electric Blue (#004cff)
  {
    id: "dr-005",
    name: "Stellar Blue Drape Dress",
    description: "A majestic dress crafted with high-lustre, rich royal blue crepe fabric. Embellished with high elegant neck gathering and stunning asymmetric fluid drapes.",
    price: 41000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 29,
    subType: "dress",
    colorTag: "#004cff"
  },
  {
    id: "dr-012",
    name: "Royal Azure Bodycon Dress",
    description: "A tailored premium stretch knit bodycon that comfortably hugs curves. Finished with detailed cut-out geometric shoulder straps for a stunning night look.",
    price: 43000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1551803091-e20673f157ad?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 15,
    subType: "dress",
    colorTag: "#004cff"
  },
  {
    id: "dr-019",
    name: "Blue Horizon Maxi Dress",
    description: "An elegant evening maxi dress in royal blue chiffon. Detailed with a deep V-neck, delicate flutter cape sleeves, and a beautifully structured pleated waistband.",
    price: 47000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 23,
    subType: "dress",
    colorTag: "#004cff"
  },
  {
    id: "tp-006",
    name: "Cobalt Linen Crop & Pants",
    description: "A beautiful electric blue co-ord. Features a fitted linen tie-front crop bodice styled perfectly with matching wide-leg trousers for a sharp tropical edit.",
    price: 54000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviewCount: 12,
    subType: "two-piece",
    colorTag: "#004cff"
  },
  {
    id: "tp-013",
    name: "Royal Blue Pleated Lounge Set",
    description: "Elevated plissé texture lounge top and flare pants set. Soft, luxurious, highly stretchable and completely breathable for beautiful comfort.",
    price: 46000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 21,
    subType: "two-piece",
    colorTag: "#004cff"
  },
  {
    id: "tp-022",
    name: "Electric Sky Casual Duo",
    description: "A premium knitted matching shorts and tank set in vibrant electric blue. Perfect for travel or a relaxed summer weekend look.",
    price: 39500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"],
    colors: ["#004cff"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 16,
    subType: "two-piece",
    colorTag: "#004cff"
  },

  // GROUP 4: Midnight Black (#202020)
  {
    id: "dr-002",
    name: "Midnight Silk Slip Dress",
    description: "Luxurious pure mulberry silk slip dress with a polished bias cut that flows like water. Featuring thin straps and a classic cowl neck.",
    price: 42000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 74,
    subType: "dress",
    colorTag: "#202020"
  },
  {
    id: "dr-015",
    name: "Obsidian Evening Lace Gown",
    description: "A spectacular black floor-length gown with hand-sewn Chantilly lace accents, structured bodice, and stunning open back profile.",
    price: 64000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 42,
    subType: "dress",
    colorTag: "#202020"
  },
  {
    id: "dr-023",
    name: "Little Black Ribbed Dress",
    description: "The ultimate casual knit dress. Structured heavy weight ribbing contouring the waist perfectly for high day-to-night versatility.",
    price: 35000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 56,
    subType: "dress",
    colorTag: "#202020"
  },
  {
    id: "tp-007",
    name: "Sleek Noir Blazer & Shorts",
    description: "A sophisticated black tailored set. Includes an asymmetric double-breasted structured blazer and high waisted tailored matching shorts.",
    price: 58000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 39,
    subType: "two-piece",
    colorTag: "#202020"
  },
  {
    id: "tp-012",
    name: "Midnight Pleated Satin Set",
    description: "Timeless plissé lounge shirt and wide pants co-ord in rich jet black. High luxury shine fabric that is incredibly comfortable.",
    price: 51200.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 41,
    subType: "two-piece",
    colorTag: "#202020"
  },
  {
    id: "tp-017",
    name: "Dark Horizon Knit Co-ord",
    description: "Cozy knit matching top and skirt duo crafted from fine wool blend. Sophisticated and minimalist look for colder months.",
    price: 47000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&w=600&q=80"],
    colors: ["#202020"],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviewCount: 22,
    subType: "two-piece",
    colorTag: "#202020"
  },

  // GROUP 5: Sunflower Yellow (#ffd54f)
  {
    id: "dr-004",
    name: "Sunshine Cotton Sundress",
    description: "Breezy bright yellow cotton sundress with delicate self-tie shoulder bows, fully lined and featuring a pleasant tiered lace skirt.",
    price: 36000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 30,
    subType: "dress",
    colorTag: "#ffd54f"
  },
  {
    id: "dr-011",
    name: "Marigold Meadow Tiered Dress",
    description: "A gorgeous warm marigold yellow tiered dress crafted in premium linen with a smocked chest panel and short volume sleeves.",
    price: 39500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewCount: 25,
    subType: "dress",
    colorTag: "#ffd54f"
  },
  {
    id: "dr-022",
    name: "Yellow Dahlia Silk Slip",
    description: "Ultra-fine liquid silk slip dress in deep golden yellow. Detailed with beautiful lace insertions and adjustable criss-cross back.",
    price: 44000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 18,
    subType: "dress",
    colorTag: "#ffd54f"
  },
  {
    id: "tp-003",
    name: "Sunflower Linen Top & Shorts",
    description: "Bright yellow premium natural linen matching set. Consists of a relaxed halter crop top and breathable high rise paperbag shorts.",
    price: 38000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L"],
    rating: 4.6,
    reviewCount: 24,
    subType: "two-piece",
    colorTag: "#ffd54f"
  },
  {
    id: "tp-014",
    name: "Golden Ray Pleated Lounge-wear",
    description: "Stretchy plissé shirt and lounge wide pants in sun yellow. Beautifully textured and designed for effortless premium styling.",
    price: 45000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 19,
    subType: "two-piece",
    colorTag: "#ffd54f"
  },
  {
    id: "tp-019",
    name: "Sunflower Crochet Duo",
    description: "Exquisite hand-crocheted summer set including a square-neck knitted tank crop and matching drawstring skirt with lining.",
    price: 49000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539008835151-34340d043b35?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ffd54f"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 13,
    subType: "two-piece",
    colorTag: "#ffd54f"
  },

  // GROUP 6: Coral Red (#ff5252)
  {
    id: "dr-006",
    name: "Coral Hibiscus Flare Dress",
    description: "Stunning vibrant coral-red dress featuring an elegant flared A-line skirt, delicate scoop neckline, and detailed buttoned back closure.",
    price: 42000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1551803091-e20673f157ad?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 31,
    subType: "dress",
    colorTag: "#ff5252"
  },
  {
    id: "dr-013",
    name: "Scarlet Rose Cocktail Dress",
    description: "Sensational cocktail dress in scarlet coral-red georgette. Boasting gorgeous hand-pleated shoulder detailing and a structured wrapped bodice.",
    price: 52000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 22,
    subType: "dress",
    colorTag: "#ff5252"
  },
  {
    id: "dr-025",
    name: "Sunset Satin Slip Dress",
    description: "A gorgeous liquid red-coral satin slip dress with a lovely drape neck and low scoop back with tie string details.",
    price: 38500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviewCount: 11,
    subType: "dress",
    colorTag: "#ff5252"
  },
  {
    id: "tp-008",
    name: "Crimson Linen Crop & Wide Pants",
    description: "Matching coral red French linen crop tank with pretty button details and paired with high waisted wide-leg flowing trousers.",
    price: 48000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 20,
    subType: "two-piece",
    colorTag: "#ff5252"
  },
  {
    id: "tp-016",
    name: "Coral Sand Knit Co-ord",
    description: "Supremely cozy cotton-knit crop top and matching high-slit skirt, featuring luxury rib texture and breathable organic yarns.",
    price: 46000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviewCount: 14,
    subType: "two-piece",
    colorTag: "#ff5252"
  },
  {
    id: "tp-021",
    name: "Lava Pleated Silk Ensemble",
    description: "Exquisite pleated soft silk long-sleeved tunic shirt and matching flare pants. Flows so beautifully when walking.",
    price: 55000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ff5252"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 18,
    subType: "two-piece",
    colorTag: "#ff5252"
  },

  // GROUP 7: Soft Lilac (#ba68c8)
  {
    id: "dr-007",
    name: "Lilac Lavender Ruffle Dress",
    description: "A dreamy georgette dress in soft lilac with tiered ruffles down the skirt, short puffed elasticated sleeves, and beautiful square neckline.",
    price: 39000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 23,
    subType: "dress",
    colorTag: "#ba68c8"
  },
  {
    id: "dr-016",
    name: "Amethyst Evening Wrap Gown",
    description: "Breathtaking premium lilac silk wrap dress. Boasting elegant kimono sleeves and a broad self-tie sash that makes an impressive bow.",
    price: 58000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewCount: 30,
    subType: "dress",
    colorTag: "#ba68c8"
  },
  {
    id: "dr-024",
    name: "Lilac Bouquet Silk Slip",
    description: "A sleek soft-lilac fine slip dress with comfortable fluid tailoring, beautiful lace neckline details, and adjustable straps.",
    price: 37000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviewCount: 17,
    subType: "dress",
    colorTag: "#ba68c8"
  },
  {
    id: "tp-001",
    name: "Lilac Spring Crop & Trousers",
    description: "A gorgeous modern co-ord in elegant soft lilac linen. Includes a tailored sleeveless high-neck top and matched high-waisted trousers.",
    price: 46500.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewCount: 40,
    subType: "two-piece",
    colorTag: "#ba68c8"
  },
  {
    id: "tp-010",
    name: "Lavender Fields Knit Co-ord",
    description: "A highly soft premium ribbed knit set. Composed of an off-the-shoulder wide-rib long-sleeve crop top and matching knit skirts.",
    price: 49000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["S", "M", "L"],
    rating: 4.9,
    reviewCount: 22,
    subType: "two-piece",
    colorTag: "#ba68c8"
  },
  {
    id: "tp-018",
    name: "Wisteria Pleated Duo",
    description: "Luxurious, beautifully flowing plissé set in rich lilac. Relaxed fit shirt paired with pleated wide flare trousers.",
    price: 52000.00,
    category: "",
    images: ["https://images.unsplash.com/photo-1552874869-5c39ec9288dc?auto=format&fit=crop&w=600&q=80"],
    colors: ["#ba68c8"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 16,
    subType: "two-piece",
    colorTag: "#ba68c8"
  }
];

// Let's ensure each category has exactly 70 items of high quality

const dressImage = "https://i.ibb.co/v4wtf5xz/Gemini-Generated-Image-feshjfeshjfeshjf.png";
const twoPieceImage = "https://i.ibb.co/spTH6FJN/Gemini-Generated-Image-jn0hxojn0hxojn0h.png";
const shoesImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtdgsmgrxpXW1GH6MdZvzywzE7ORVJP-qgaajzSkIUfPBa2HS_IWSSLc&s=10";
const bagsImage = "https://static.thenounproject.com/png/2229920-200.png";

// Mutate product images to match the new image assets specified by the user
products.forEach((p) => {
  if (p.subType === "dress") {
    p.images = [dressImage];
  } else if (p.subType === "two-piece") {
    p.images = [twoPieceImage];
  } else if (p.category === "shoes") {
    p.images = [shoesImage];
  } else if (p.category === "bags") {
    p.images = [bagsImage];
  }
});

// Helper function to fill missing products up to 70 per category
const fillTo70 = (
  filterFn: (p: Product) => boolean,
  createFn: (index: number) => Product
) => {
  const currentCount = products.filter(filterFn).length;
  const needed = 70 - currentCount;
  for (let i = 0; i < needed; i++) {
    products.push(createFn(i + 1));
  }
};

// Fill dresses
fillTo70(
  (p) => p.subType === "dress",
  (i) => ({
    id: `dress-gen-${i}`,
    name: `Elegant Evening Dress ${i}`,
    description: `An exquisite Evening Dress meticulously designed for stunning appeal and refined comfort. Hand-crafted seams, premium materials, and structured draping make it an unparalleled silhouette.`,
    price: 35000.00 + (i * 250) % 15000,
    compareAtPrice: 50000.00 + (i * 250) % 15000,
    category: "",
    images: [dressImage],
    colors: ["#202020", "#004cff"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: parseFloat((4.5 + (i % 6) * 0.1).toFixed(1)),
    reviewCount: 15 + (i * 7) % 250,
    subType: "dress",
    colorTag: "#202020",
    tags: i % 2 === 0 ? ["New Arrival"] : ["Classic Collection"]
  })
);

// Fill two-pieces
fillTo70(
  (p) => p.subType === "two-piece",
  (i) => ({
    id: `two-piece-gen-${i}`,
    name: `Chic Silhouette Two-Piece ${i}`,
    description: `A stunning styled set consisting of perfectly coordinated top and trousers. Tailored from highly luxurious, breathable fabrics to ensure effortless comfort and impeccable panache.`,
    price: 42000.00 + (i * 310) % 18000,
    compareAtPrice: 58000.00 + (i * 310) % 18000,
    category: "",
    images: [twoPieceImage],
    colors: ["#ffffff", "#202020"],
    sizes: ["S", "M", "L", "XL"],
    rating: parseFloat((4.4 + (i % 7) * 0.1).toFixed(1)),
    reviewCount: 10 + (i * 9) % 200,
    subType: "two-piece",
    colorTag: "#ffffff",
    tags: i % 3 === 0 ? ["Limited Edition"] : ["Best Seller"]
  })
);

// Fill shoes
fillTo70(
  (p) => p.category === "shoes",
  (i) => ({
    id: `shoes-gen-${i}`,
    name: `Premium Leather Shoe ${i}`,
    description: `Luxury styling meets unrivaled modern walkability. Features hand-crafted leather insoles, balanced stiletto high heel supports, and specialized contouring for everyday elegance.`,
    price: 28000.00 + (i * 450) % 12000,
    compareAtPrice: 39000.00 + (i * 450) % 12000,
    category: "shoes",
    images: [shoesImage],
    colors: ["#202020", "#ffffff"],
    sizes: ["s-36", "s-37", "s-38", "s-39", "s-40"],
    rating: parseFloat((4.6 + (i % 5) * 0.1).toFixed(1)),
    reviewCount: 8 + (i * 12) % 320,
    colorTag: "#202020",
    tags: i % 4 === 0 ? ["Must Have"] : ["Trending"]
  })
);

// Fill handbags
fillTo70(
  (p) => p.category === "bags",
  (i) => ({
    id: `handbags-gen-${i}`,
    name: `Signature Evening Bag ${i}`,
    description: `A masterclass in modern hardware and structural luxury design. Offers optimized pocket organizers, golden key lock mechanisms, and a durable luxury leather frame.`,
    price: 49000.00 + (i * 520) % 25000,
    compareAtPrice: 65000.00 + (i * 520) % 25000,
    category: "bags",
    images: [bagsImage],
    colors: ["#202020"],
    sizes: ["One Size"],
    rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
    reviewCount: 20 + (i * 6) % 180,
    colorTag: "#202020",
    tags: i % 5 === 0 ? ["Exclusive"] : ["Top Rated"]
  })
);

// Keep only products that fall strictly under our four approved categories
const approvedProducts = products.filter((p) => {
  return (
    p.subType === "dress" ||
    p.subType === "two-piece" ||
    p.category === "shoes" ||
    p.category === "bags"
  );
});

// Mutate original products array in-place
products.length = 0;
products.push(...approvedProducts);

const normalizePreviewImages = (images: string[]) => {
  if (images.length === 0) {
    return [];
  }

  if (images.length >= 4) {
    return images.slice(0, 4);
  }

  return Array.from({ length: 4 }, (_, index) => images[index % images.length]);
};

products.forEach((product) => {
  product.images = normalizePreviewImages(product.images);
});


