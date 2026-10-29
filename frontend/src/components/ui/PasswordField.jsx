import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";

export default function PasswordField(props) {
  const [show, setShow] = useState(false);

  return (
    <InputField
      icon={Lock}
      type={show ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label="Toggle password visibility"
          className="text-slate-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
}
