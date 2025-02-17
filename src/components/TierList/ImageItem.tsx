'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Draggable } from '@hello-pangea/dnd';
import { ImageItem as ImageItemType } from '@/types';

interface ImageItemProps {
  item: ImageItemType;
  index: number;
  onDelete: (id: string) => void;
  onUpdateLegend: (id: string, legend: string) => void;
}

const ImageItem = ({ item, index, onDelete, onUpdateLegend }: ImageItemProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [legend, setLegend] = useState(item.legend || '');
  const [size, setSize] = useState<'small' | 'normal' | 'large'>(item.size || 'normal');

  const handleSizeChange = () => {
    const sizes: Array<'small' | 'normal' | 'large'> = ['small', 'normal', 'large'];
    const currentIndex = sizes.indexOf(size);
    const nextSize = sizes[(currentIndex + 1) % sizes.length] as 'small' | 'normal' | 'large';
    setSize(nextSize);
  };

  const sizeClasses = {
    small: 'h-16 w-16',
    normal: 'h-20 w-20',
    large: 'h-24 w-24',
  };

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`relative group ${sizeClasses[size]} transition-all duration-200`}
          >
            {/* Imagem Principal */}
            <div 
              onClick={() => setShowPreview(true)}
              className="relative w-full h-full cursor-pointer"
            >
              <Image
                src={item.url}
                alt={item.legend || "Tier item"}
                fill
                className="object-cover rounded-sm"
              />
            </div>

            {/* Overlay com Controles */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-sm">
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                {/* Botão de Deletar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="p-1 bg-red-600 hover:bg-red-700 rounded-sm"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Botão de Redimensionar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSizeChange();
                  }}
                  className="p-1 bg-blue-600 hover:bg-blue-700 rounded-sm"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              {/* Legenda */}
              <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                {isEditing ? (
                  <input
                    type="text"
                    value={legend}
                    onChange={(e) => setLegend(e.target.value)}
                    onBlur={() => {
                      setIsEditing(false);
                      onUpdateLegend(item.id, legend);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditing(false);
                        onUpdateLegend(item.id, legend);
                      }
                    }}
                    className="w-full px-2 py-1 text-xs bg-black bg-opacity-75 text-white outline-none"
                    autoFocus
                  />
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="px-2 py-1 text-xs bg-black bg-opacity-75 text-white truncate cursor-text"
                  >
                    {legend || 'Add legend...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      {/* Modal de Preview */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-2xl max-h-[80vh] w-auto h-auto">
            <Image
              src={item.url}
              alt={item.legend || "Preview"}
              width={800}
              height={800}
              className="object-contain"
            />
            {item.legend && (
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black bg-opacity-75 text-white">
                {item.legend}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageItem;
