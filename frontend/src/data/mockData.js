export const summary = {
  spent: 2480.5,
  limit: 3200,
  remaining: 719.5,
  perDay: 78.2,
  daysLeft: 9,
  transactions: 42,
  manual: 31,
  receipts: 11,
};

export const weekly = [
  { day: "Mon", amount: 62 },
  { day: "Tue", amount: 98 },
  { day: "Wed", amount: 44 },
  { day: "Thu", amount: 134.8, today: true },
  { day: "Fri", amount: 76 },
  { day: "Sat", amount: 108 },
  { day: "Sun", amount: 38 },
];

export const categories = [
  {
    name: "Food & Dining",
    spent: 672,
    limit: 800,
    note: "Approaching cap",
    warn: true,
  },
  { name: "Shopping", spent: 390, limit: 600, note: "Steady pace" },
  { name: "Transportation", spent: 182, limit: 350, note: "Well buffered" },
  { name: "Entertainment", spent: 135, limit: 300, note: "Under projected" },
  { name: "Utilities", spent: 190, limit: 500, note: "Normal recurring" },
];

export const initialExpenses = [
  {
    id: 1,
    title: "Blue Bottle Coffee",
    when: "Today, 9:24 AM",
    category: "Food & Dining",
    source: "receipt",
    amount: 6.8,
  },
  {
    id: 2,
    title: "Nordstrom Rack",
    when: "Yesterday",
    category: "Shopping",
    source: "manual",
    amount: 128,
  },
  {
    id: 3,
    title: "MTA MetroCard Refill",
    when: "Oct 21",
    category: "Transit",
    source: "pdf",
    amount: 34,
  },
  {
    id: 4,
    title: "Criterion Channel",
    when: "Oct 20",
    category: "Entertainment",
    source: "manual",
    amount: 10.99,
  },
  {
    id: 5,
    title: "Trader Joe's",
    when: "Oct 19",
    category: "Groceries",
    source: "receipt",
    amount: 76.42,
  },
];
