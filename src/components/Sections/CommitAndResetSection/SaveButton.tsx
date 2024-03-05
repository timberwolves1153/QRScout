import { useState } from "preact/hooks";

export type SaveButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function SaveButton(props: SaveButtonProps) {
  const [effect, setEffect] = useState(false);
  return (
    <button
      className={ `${effect && "animate-wiggle" } focus:shadow-outline mx-2 rounded bg-gray-700 py-6 px-6 m-2 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300 dark:bg-primary` }
      type="button"
      onClick={() => {setEffect(true); props.onClick()}}
      disabled={props.disabled}
      onAnimationEnd={() => setEffect(false)}
    >
      Save QR to Local Storage
    </button>
  );
}
