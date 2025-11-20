import { useState, useEffect } from 'react';
import { ArrowUpIcon } from 'lucide-react'; // Using Lucide icons for modern aesthetics

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button depending on the scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 left-8 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
          aria-label="Scroll to Top"
        >
          <ArrowUpIcon size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
