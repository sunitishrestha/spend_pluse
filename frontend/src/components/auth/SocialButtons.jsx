import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const btn =
  "flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50/70 py-3.5 font-medium transition hover:bg-blue-100/70";

export default function SocialButtons() {
  return (
    <div className="flex gap-3">
      <button type="button" className={btn}>
        <FcGoogle size={20} /> Google
      </button>
      <button type="button" className={btn}>
        <FaApple size={20} /> Apple
      </button>
    </div>
  );
}
