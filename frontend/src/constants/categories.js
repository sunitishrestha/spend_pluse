import {
  Utensils,
  ShoppingBag,
  Bus,
  Ticket,
  Zap,
  ShoppingCart,
  CircleDollarSign,
} from "lucide-react";

export const CATEGORY_STYLES = {
  "Food & Dining": {
    icon: Utensils,
    chip: "bg-amber-50 text-amber-700",
    bar: "bg-amber-700",
    text: "text-amber-700",
  },
  Shopping: {
    icon: ShoppingBag,
    chip: "bg-blue-50 text-blue-700",
    bar: "bg-blue-600",
    text: "text-slate-600",
  },
  Transportation: {
    icon: Bus,
    chip: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-700",
    text: "text-emerald-700",
  },
  Transit: {
    icon: Bus,
    chip: "bg-emerald-50 text-emerald-700",
    bar: "bg-emerald-700",
    text: "text-emerald-700",
  },
  Entertainment: {
    icon: Ticket,
    chip: "bg-indigo-50 text-indigo-700",
    bar: "bg-blue-400",
    text: "text-slate-600",
  },
  Utilities: {
    icon: Zap,
    chip: "bg-slate-100 text-slate-700",
    bar: "bg-blue-700",
    text: "text-emerald-700",
  },
  Groceries: {
    icon: ShoppingCart,
    chip: "bg-amber-50 text-amber-700",
    bar: "bg-amber-600",
    text: "text-slate-600",
  },
  Other: {
    icon: CircleDollarSign,
    chip: "bg-slate-100 text-slate-700",
    bar: "bg-slate-500",
    text: "text-slate-600",
  },
};
