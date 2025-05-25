import { ArrowButtonProps } from "@/types";
  
  const ArrowButton = ({ direction = 'forward', changePage }: ArrowButtonProps) => {
    const isBackward = direction === 'backward';
  
    return (
      <div onClick={changePage}>
        <a
          className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
        >
          <svg
            className={`size-5 shadow-sm transition-transform duration-300 ${isBackward ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    );
  };
  
  export default ArrowButton;
  