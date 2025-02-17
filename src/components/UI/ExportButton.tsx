import { RefObject } from 'react';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

const ExportButton = ({ containerRef }: ExportButtonProps) => {
  const exportAsImage = async () => {
    if (!containerRef.current) return;

    try {
      const canvas = await html2canvas(containerRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'tierlist.png';
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  return (
    <button
      onClick={exportAsImage}
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md
        transition-colors flex items-center gap-2"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      Export as Image
    </button>
  );
};

export default ExportButton;