export type Product = {
  id: string;
  title: string;
  material: "Plastic" | "Cardboard" | "Glass" | "Denim" | "Metal" | "Wood" | "Cork" | "Paper";
  image: string;
  time: string;
  cost: string;
  difficulty: "Easy" | "Medium" | "Hard";
  impactKg: number;
  ideas: number;
  votes: number;
  summary: string;
  materialsList: string[];
  steps: string[];
  safety: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "bottle-planter",
    title: "Bottle Planter",
    material: "Plastic",
    image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=1200&q=80",
    time: "18 min",
    cost: "$0",
    difficulty: "Easy",
    impactKg: 0.4,
    ideas: 12,
    votes: 214,
    summary: "Turn a plastic bottle into a self-watering planter for windowsill herbs.",
    materialsList: ["1 empty plastic bottle (1–2 L)", "Cotton string (20 cm)", "Potting soil", "Seedling"],
    steps: [
      "Rinse the bottle and remove the label.",
      "Cut the bottle in half around the middle.",
      "Thread cotton string through the bottle cap.",
      "Invert the top half into the bottom, add soil and seedling.",
      "Pour water into the bottom reservoir.",
    ],
    safety: ["Use scissors carefully — the bottle can slip.", "Sand any sharp cut edges."],
  },
  {
    id: "jar-lantern",
    title: "Jar Lantern",
    material: "Glass",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    time: "15 min",
    cost: "$1",
    difficulty: "Easy",
    impactKg: 0.6,
    ideas: 15,
    votes: 331,
    summary: "Repurpose a glass jar as a warm fairy-light lantern for evenings.",
    materialsList: ["1 glass jar with lid", "Battery LED fairy lights", "Twine"],
    steps: [
      "Clean and dry the jar completely.",
      "Coil the LED string inside the jar.",
      "Wrap twine around the neck for a rustic finish.",
      "Turn on before dusk for warm ambience.",
    ],
    safety: ["Only use battery-powered LEDs — never wired bulbs.", "Keep the jar on a stable surface."],
  },
  {
    id: "cardboard-desk-org",
    title: "Cardboard Desk Organizer",
    material: "Cardboard",
    image: "https://images.unsplash.com/photo-1493552832879-9147d504dbd7?w=1200&q=80",
    time: "32 min",
    cost: "$2",
    difficulty: "Medium",
    impactKg: 0.9,
    ideas: 9,
    votes: 187,
    summary: "Corrugated cardboard becomes a modular desk organizer.",
    materialsList: ["1 large cardboard box", "Craft knife", "Ruler", "Glue", "Paint (optional)"],
    steps: [
      "Measure and cut base and dividers.",
      "Score fold lines with the back of the knife.",
      "Glue dividers into place and clamp with books until dry.",
      "Paint or leave raw for a natural look.",
    ],
    safety: ["Always cut away from your body.", "Use a cutting mat to protect your desk."],
  },
  {
    id: "denim-tote",
    title: "Denim Tote",
    material: "Denim",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    time: "45 min",
    cost: "$0",
    difficulty: "Medium",
    impactKg: 1.2,
    ideas: 7,
    votes: 142,
    summary: "Old jeans become a sturdy market tote in under an hour.",
    materialsList: ["1 pair of old jeans", "Strong thread", "Sewing needle or machine"],
    steps: [
      "Cut the legs off just below the pockets.",
      "Sew the bottom opening shut with a double seam.",
      "Cut a leg into two straps and stitch to the waistband.",
      "Reinforce the corners with cross-stitches.",
    ],
    safety: ["Mind your fingers near the sewing machine needle."],
  },
  {
    id: "tin-can-lamp",
    title: "Tin Can Lamp",
    material: "Metal",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=1200&q=80",
    time: "40 min",
    cost: "$3",
    difficulty: "Medium",
    impactKg: 0.7,
    ideas: 11,
    votes: 165,
    summary: "Punch a pattern into a tin can to cast beautiful light patterns.",
    materialsList: ["1 clean tin can", "Hammer and nail", "Sandpaper", "LED tea light"],
    steps: [
      "Fill the can with water and freeze so it holds shape.",
      "Mark a pattern with a marker.",
      "Punch holes along the marks with hammer and nail.",
      "Let the ice melt, dry, sand rim, drop in the LED.",
    ],
    safety: ["Wear gloves — rim edges can be sharp.", "Never use an open flame inside."],
  },
  {
    id: "pallet-shelf",
    title: "Pallet Shelf",
    material: "Wood",
    image: "https://images.unsplash.com/photo-1490252305180-8c58b6ed12bb?w=1200&q=80",
    time: "90 min",
    cost: "$5",
    difficulty: "Hard",
    impactKg: 3.5,
    ideas: 6,
    votes: 98,
    summary: "Reclaim pallet wood into a rustic wall-mounted shelf.",
    materialsList: ["1 wooden pallet", "Sandpaper", "Wood stain", "Wall anchors and screws"],
    steps: [
      "Disassemble the pallet with a pry bar.",
      "Sand every plank to remove splinters.",
      "Stain and let dry overnight.",
      "Assemble as a two-tier shelf and mount to the wall.",
    ],
    safety: ["Check for nails before sanding.", "Ensure wall anchors match your wall type."],
  },
  {
    id: "cork-board",
    title: "Wine Cork Pin Board",
    material: "Cork",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    time: "25 min",
    cost: "$1",
    difficulty: "Easy",
    impactKg: 0.2,
    ideas: 8,
    votes: 121,
    summary: "Collect wine corks and glue them into a warm, tactile pin board.",
    materialsList: ["30–40 wine corks", "Picture frame", "Hot glue"],
    steps: [
      "Remove the glass from the frame.",
      "Arrange corks tightly inside the frame.",
      "Glue each cork to the backing.",
      "Hang and start pinning notes.",
    ],
    safety: ["Hot glue burns — use a stand."],
  },
  {
    id: "paper-bead-art",
    title: "Paper Bead Wall Art",
    material: "Paper",
    image: "https://images.unsplash.com/photo-1516685304081-de7947d419d5?w=1200&q=80",
    time: "60 min",
    cost: "$1",
    difficulty: "Medium",
    impactKg: 0.3,
    ideas: 5,
    votes: 88,
    summary: "Roll magazine strips into colourful beads and string into wall art.",
    materialsList: ["Old magazines", "Toothpick", "Glue stick", "Twine", "Small canvas"],
    steps: [
      "Cut long triangular strips from magazines.",
      "Roll around the toothpick from the wide end and glue.",
      "String beads on twine in patterns.",
      "Mount the strings across the canvas.",
    ],
    safety: ["Keep glue away from young children."],
  },
];

export function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}