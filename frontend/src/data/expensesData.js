const base = [
  {
    id: 1,
    date: "2024-10-23T11:20",
    title: "Whole Foods Market",
    note: "Weekly organic groceries, produce & sparkling water",
    category: "Food & Dining",
    payment: "Apple Pay •• 8820",
    source: "receipt",
    amount: 112.45,
  },
  {
    id: 2,
    date: "2024-10-22T20:45",
    title: "Uber Transit",
    note: "Ride from SoHo to Downtown Financial District",
    category: "Transport",
    payment: "Chase Sapphire •• 4912",
    source: "receipt",
    amount: 24.8,
  },
  {
    id: 3,
    date: "2024-10-21T16:10",
    title: "Nordstrom Rack",
    note: "Merino wool sweater & running trainers",
    category: "Shopping",
    payment: "Chase Sapphire •• 4912",
    source: "manual",
    amount: 128,
  },
  {
    id: 4,
    date: "2024-10-20T09:05",
    title: "Blue Bottle Coffee",
    note: "Bella Donovan blend drip & oat milk cortado",
    category: "Food & Dining",
    payment: "Apple Pay •• 8820",
    source: "manual",
    amount: 6.8,
  },
  {
    id: 5,
    date: "2024-10-19T07:50",
    title: "MTA MetroCard",
    note: "7-Day unlimited transit pass refill",
    category: "Transport",
    payment: "Cash / Checking",
    source: "receipt",
    amount: 34,
  },
  {
    id: 6,
    date: "2024-10-18T13:00",
    title: "Criterion Channel",
    note: "Monthly recurring cinema subscription",
    category: "Entertainment",
    payment: "Chase Sapphire •• 4912",
    source: "manual",
    amount: 10.99,
  },
  {
    id: 7,
    date: "2024-10-16T18:30",
    title: "Trader Joe's",
    note: "Produce, snacks, fresh sourdough & olive oil",
    category: "Food & Dining",
    payment: "Apple Pay •• 8820",
    source: "receipt",
    amount: 76.42,
  },
  {
    id: 8,
    date: "2024-10-14T10:14",
    title: "ConEdison Electric",
    note: "Monthly residential electric utility bill",
    category: "Utilities",
    payment: "Cash / Checking",
    source: "manual",
    amount: 94.2,
  },
];

const extraPlan = [
  {
    category: "Food & Dining",
    count: 11,
    items: [
      ["Sweetgreen", "Harvest bowl lunch"],
      ["Joe's Pizza", "Slice and soda"],
      ["Shake Shack", "Burger & fries"],
    ],
  },
  {
    category: "Transport",
    count: 6,
    items: [
      ["Lyft", "Evening ride downtown"],
      ["Citi Bike", "Monthly membership"],
      ["Shell", "Fuel top-up"],
    ],
  },
  {
    category: "Shopping",
    count: 6,
    items: [
      ["Target", "Household supplies"],
      ["Amazon", "Desk accessories"],
      ["Uniqlo", "Everyday basics"],
    ],
  },
  {
    category: "Entertainment",
    count: 4,
    items: [
      ["Netflix", "Monthly subscription"],
      ["AMC Theatres", "Movie night tickets"],
    ],
  },
  {
    category: "Utilities",
    count: 4,
    items: [
      ["Verizon Fios", "Internet service"],
      ["Spectrum Mobile", "Phone plan"],
    ],
  },
  {
    category: "Other",
    count: 3,
    items: [
      ["Walgreens", "Pharmacy items"],
      ["USPS", "Postage & shipping"],
    ],
  },
];

const payments = [
  "Apple Pay •• 8820",
  "Chase Sapphire •• 4912",
  "Cash / Checking",
];
const two = (n) => String(n).padStart(2, "0");

const generated = extraPlan
  .flatMap(({ category, count, items }) =>
    Array.from({ length: count }, (_, i) => ({
      category,
      merchant: items[i % items.length],
    })),
  )
  .map(({ category, merchant }, i) => ({
    id: base.length + i + 1,
    date: `2024-10-${two(13 - (i % 13))}T${two(8 + ((i * 3) % 12))}:${two((i * 7) % 60)}`,
    title: merchant[0],
    note: merchant[1],
    category,
    payment: payments[i % 3],
    source: i % 2 === 0 ? "receipt" : "manual",
    amount: 8.5 + ((i * 37) % 120),
  }));

export const allExpenses = [...base, ...generated];
export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Other",
];
