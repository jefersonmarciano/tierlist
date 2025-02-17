'use client';

import { useState, useEffect, useRef } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import TierRow from '@/components/TierList/TierRow';
import UnrankedSection from '@/components/TierList/UnrankedSection';
import { ImageItem, TierRank } from '@/types';
import ExportButton from '@/components/UI/ExportButton';

export default function Home() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const tiers: TierRank[] = ['S+', 'S', 'A', 'B', 'C', 'D'];
  const tierListRef = useRef<HTMLDivElement>(null);

  const handleDrop = (result: DropResult) => {
    if (!result.destination) return;
    
    const newItems = [...items];
    const itemIndex = newItems.findIndex(item => item.id === result.draggableId);
    const [movedItem] = newItems.splice(itemIndex, 1);
    
    movedItem.tier = result.destination.droppableId === 'unranked' 
      ? undefined 
      : result.destination.droppableId as TierRank;
      
    const destinationIndex = result.destination.index;
    newItems.splice(destinationIndex, 0, movedItem);
    
    setItems(newItems);
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') === 0) {
        const blob = item.getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);
          setItems(prev => [...prev, {
            id: uuidv4(),
            url,
            tier: undefined
          }]);
        }
      }
    }
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setItems(prev => [...prev, {
      id: uuidv4(),
      url,
      tier: undefined
    }]);
  };

  const handleDeleteImage = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateLegend = (id: string, legend: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, legend } : item
    ));
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 relative mb-8">
            Tier List Maker
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-red-600" />
          </h1>
          
          <div className="flex gap-4">
            <ExportButton containerRef={tierListRef} />
          </div>
        </div>
        
        <DragDropContext onDragEnd={handleDrop}>
          <div ref={tierListRef} className="max-w-5xl mx-auto">
            <div className="space-y-1">
              {tiers.map((tier) => (
                <TierRow
                  key={tier}
                  rank={tier}
                  items={items.filter(item => item.tier === tier)}
                  onDeleteImage={handleDeleteImage}
                  onUpdateLegend={handleUpdateLegend}
                />
              ))}
            </div>
            
            <UnrankedSection
              items={items.filter(item => !item.tier)}
              onImageUpload={handleImageUpload}
              onDeleteImage={handleDeleteImage}
              onUpdateLegend={handleUpdateLegend}
            />
          </div>
        </DragDropContext>
      </div>
    </main>
  );
}
