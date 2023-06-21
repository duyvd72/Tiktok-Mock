import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="bg-[#fe2c55] w-8 h-8 rounded-full flex justify-center items-center hover:bg-[#e32b50]"
    >
      <i className="fas fa-chevron-up text-white"></i>
    </button>
  );
};

export default ScrollToTop;
