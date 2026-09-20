// Default (demo) properties that use the images already shipped in
// Frontend/public/assets. The image url starts with "/assets/..." so the
// browser loads it from the frontend itself (no ImageKit upload needed).
//
// Every property needs at least 6 images (schema rule) - the first one is
// the cover image shown on the home page cards.

const img = (file) => ({ public_id: `default/${file}`, url: `/assets/${file}` });

const A = {
  wifi: { name: "Wifi", icon: "wifi" },
  kitchen: { name: "Kitchen", icon: "kitchen" },
  parking: { name: "Free Parking", icon: "garage_home" },
  tv: { name: "Tv", icon: "tv" },
  pool: { name: "Pool", icon: "pool" },
  ac: { name: "Ac", icon: "air" },
};

// picks 6 images: cover first, then the rest of the pool
const gallery = (cover, ...rest) => [cover, ...rest].map(img);

export const defaultProperties = [
  {
    propertyName: "Olive Inn",
    description:
      "A charming hillside villa with a big lawn, tea-estate views and glowing evening skies. Perfect for a quiet family weekend right by the ECR coast road.",
    propertyType: "Guest House",
    roomType: "Entire Home",
    maximumGuest: 6,
    price: 3000,
    address: { area: "ecr", city: "chennai", state: "tamilnadu", pincode: 600119 },
    amenities: [A.wifi, A.kitchen, A.parking, A.tv],
    images: gallery("image1.jpeg", "image2.jpeg", "image3.jpeg", "image4.jpeg", "image7.jpeg", "image8.jpeg", "image6.jpeg"),
  },
  {
    propertyName: "Munnar Farmhouse",
    description:
      "A peaceful farmhouse surrounded by greenery and misty mountains. Wake up to fresh air, sit around the bonfire at night and enjoy the countryside.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 8,
    price: 4200,
    address: { area: "top station road", city: "munnar", state: "kerala", pincode: 685612 },
    amenities: [A.wifi, A.kitchen, A.parking],
    images: gallery("image8.jpeg", "image6.jpeg", "image1.jpeg", "image7.jpeg", "image3.jpeg", "image2.jpeg", "image4.jpeg"),
  },
  {
    propertyName: "Sunnyside Up",
    description:
      "Cosy cottage with a fire pit, open garden and a view of the misty valley. Ideal for couples and small groups who want a slow, relaxed stay.",
    propertyType: "House",
    roomType: "Room",
    maximumGuest: 4,
    price: 3500,
    address: { area: "lake road", city: "kodaikanal", state: "tamilnadu", pincode: 624101 },
    amenities: [A.wifi, A.kitchen, A.tv],
    images: gallery("image6.jpeg", "image4.jpeg", "image2.jpeg", "image7.jpeg", "image5.jpeg", "image1.jpeg", "image3.jpeg"),
  },
  {
    propertyName: "Carnival Luxury Apartments",
    description:
      "Modern rooftop apartment with a lush terrace garden, city skyline views and stylish interiors. Walking distance to cafes and shopping.",
    propertyType: "Flat",
    roomType: "Entire Home",
    maximumGuest: 4,
    price: 5500,
    address: { area: "anna nagar", city: "chennai", state: "tamilnadu", pincode: 600040 },
    amenities: [A.wifi, A.ac, A.tv, A.pool, A.parking],
    images: gallery("property2.webp", "property3.webp", "property4.webp", "image3.jpeg", "image7.jpeg", "image5.jpeg", "property7.webp"),
  },
  {
    propertyName: "Skyline Terrace Suites",
    description:
      "Elegant suite with a private terrace and floor-to-ceiling glass doors. Enjoy candle-light dinners with a view of the city lights.",
    propertyType: "Hotel",
    roomType: "Room",
    maximumGuest: 2,
    price: 4800,
    address: { area: "race course", city: "coimbatore", state: "tamilnadu", pincode: 641018 },
    amenities: [A.wifi, A.ac, A.tv],
    images: gallery("property3.webp", "property2.webp", "property7.webp", "image3.jpeg", "image7.jpeg", "image5.jpeg", "property6.webp"),
  },
  {
    propertyName: "Seaview Retreat",
    description:
      "Wooden-deck beach house facing the open sea. Sea breeze, sunsets and comfy lounge seating right outside your room.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 6,
    price: 6000,
    address: { area: "white town", city: "pondicherry", state: "puducherry", pincode: 605001 },
    amenities: [A.wifi, A.ac, A.kitchen, A.pool],
    images: gallery("property4.webp", "property3.webp", "property2.webp", "image7.jpeg", "image3.jpeg", "image5.jpeg", "image8.jpeg"),
  },
  {
    propertyName: "Green Nest Courtyard",
    description:
      "A homely stay built around a beautiful plant courtyard. Great for nature lovers who enjoy gardening, filter coffee and quiet mornings.",
    propertyType: "House",
    roomType: "Room",
    maximumGuest: 3,
    price: 2200,
    address: { area: "charing cross", city: "ooty", state: "tamilnadu", pincode: 643001 },
    amenities: [A.wifi, A.kitchen, A.parking],
    images: gallery("property5.webp", "image2.jpeg", "image4.jpeg", "image7.jpeg", "image5.jpeg", "image3.jpeg", "image1.jpeg"),
  },
  {
    propertyName: "Modern Villa Retreat",
    description:
      "Contemporary villa in a gated community with landscaped gardens, a spacious living area and secure parking. Best for big families.",
    propertyType: "House",
    roomType: "Entire Home",
    maximumGuest: 10,
    price: 7500,
    address: { area: "saibaba colony", city: "coimbatore", state: "tamilnadu", pincode: 641011 },
    amenities: [A.wifi, A.ac, A.kitchen, A.tv, A.pool, A.parking],
    images: gallery("property6.webp", "image3.jpeg", "image7.jpeg", "image5.jpeg", "image8.jpeg", "image1.jpeg", "property5.webp"),
  },
  {
    propertyName: "Heritage Home Stay",
    description:
      "Traditional home with carved wooden doors, a dining hall and warm interiors. Feel the old-town charm with modern comforts.",
    propertyType: "Guest House",
    roomType: "Room",
    maximumGuest: 5,
    price: 2800,
    address: { area: "west masi street", city: "madurai", state: "tamilnadu", pincode: 625001 },
    amenities: [A.wifi, A.ac, A.kitchen],
    images: gallery("property7.webp", "image3.jpeg", "image7.jpeg", "image5.jpeg", "property2.webp", "property6.webp", "image1.jpeg"),
  },
];
