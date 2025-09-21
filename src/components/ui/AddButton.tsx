interface AddButtonProps {
    name: string;
    onClick?: () => void;
}

function AddButton({ name, onClick }: AddButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
        bg-blue-600 hover:bg-blue-700 text-white font-bold 
        flex items-center justify-center 
        transition-all duration-300
        
        w-12 h-12 rounded-full
        
        sm:w-auto sm:rounded-md sm:px-4 sm:py-2
      "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>

            {/* Text is hidden on mobile, visible on sm: screens */}
            <span className="hidden sm:inline sm:ml-2">
                {name}
            </span>
        </button>
    );
}

export default AddButton;