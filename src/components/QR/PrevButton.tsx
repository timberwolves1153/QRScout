export type PrevButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function PrevButton(props: PrevButtonProps) {
  return (
    <button
      className="focus:shadow-outline rounded-full text-gray-500 absolute top-0 left-0 m-2 p-2 hover:text-gray-800 "
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
          d="M12 12 18 6M12 12l6 6"
        />
      </svg>
    </button>
  );
}
