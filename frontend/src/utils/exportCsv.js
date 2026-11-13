export function exportCsv(rows, filename = "expenses.csv") {
  const header = [
    "Date",
    "Merchant",
    "Description",
    "Category",
    "Payment",
    "Source",
    "Amount",
  ];
  const lines = rows.map((e) =>
    [
      e.date,
      e.title,
      e.note,
      e.category,
      e.payment,
      e.source,
      e.amount.toFixed(2),
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(","),
  );

  const blob = new Blob([[header.join(","), ...lines].join("\n")], {
    type: "text/csv",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
