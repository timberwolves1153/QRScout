export type ClearSaveButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function ClearSaveButton(props: ClearSaveButtonProps) {
  return (
    <button
      className="focus:shadow-outline mx-2 rounded bg-gray-700 py-6 px-6 m-2 font-bold uppercase text-white hover:bg-gray-700 focus:shadow-lg focus:outline-none disabled:bg-gray-300 dark:bg-primary"
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Clear Saved QR Codes
    </button>
  );
}
