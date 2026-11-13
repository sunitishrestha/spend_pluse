import { ScanLine } from "lucide-react";

export default function ReceiptPromo() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50/80 p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700">
          <ScanLine size={22} />
        </span>
        <div>
          <h3 className="font-semibold">
            Got paper receipts or email invoices?
          </h3>
          <p className="max-w-xl text-sm text-slate-700">
            Drag and drop receipts directly into SpendPulse to automatically
            match them against untagged manual debits.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium">
          Bulk OCR Upload
        </button>
        <button className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
          Connect Inbox
        </button>
      </div>
    </section>
  );
}
