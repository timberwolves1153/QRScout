export type NextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function NextButton(props: NextButtonProps) {
  return (
    <button
      className="focus:shadow-outline rounded-full text-gray-500 absolute top-0 left-10 m-2 p-2 hover:text-gray-800 "
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 12 12M6 6l6 6"
        />
      </svg>
    </button>
  );
}
