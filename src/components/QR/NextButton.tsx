export type NextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function NextButton(props: NextButtonProps) {
  return (
    <button
      className="focus:shadow-outline rounded-full disabled:text-gray-500 m-2 p-2 hover:text-gray-800 bg-red-rhr align-right text-white"
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Next
    </button>
  );
}
