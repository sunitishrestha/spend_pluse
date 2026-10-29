export default function Divider({ children }) {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-slate-600">
      <div className="h-px flex-1 bg-blue-100" />
      <span>{children}</span>
      <div className="h-px flex-1 bg-blue-100" />
    </div>
  );
}
