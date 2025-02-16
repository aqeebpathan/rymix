import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CreditPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-neutral-950 border border-neutral-700 text-neutral-50 p-6 rounded-lg w-11/12 sm:w-96 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Music Credits</h2>

            <p className="mb-4 text-neutral-400 text-sm ">
              We are deeply grateful to the talented artists whose music
              enhances this experience.
            </p>

            <p className="mb-4 text-neutral-400 text-sm ">
              All music featured on this platform remains the property of its
              respective creators. This project is non-commercial and built for
              learning purposes, with full respect for the original artists.
            </p>

            <p className="mb-4">
              <Link
                to="/credits"
                className="text-neutral-50 group font-medium text-sm underline underline-offset-2"
                onClick={() => setIsVisible(false)}
              >
                View Full Music Credits
              </Link>
            </p>

            <p className="text-sm text-neutral-400 tracking- leading-tight">
              All rights to the music remain with their respective owners.
            </p>

            <button
              onClick={() => setIsVisible(false)}
              className="mt-5 bg-neutral-100 text-neutral-950 text-sm font-semibold py-2 px-4 rounded hover:opacity-85 cursor-pointer tracking-tight w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreditPopup;
