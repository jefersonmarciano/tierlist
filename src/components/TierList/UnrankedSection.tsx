import { Droppable } from '@hello-pangea/dnd';
import { ImageItem as ImageItemType } from '@/types';
import ImageUpload from '../UI/ImageUpload';
import ImageItem from './ImageItem';

interface UnrankedSectionProps {
  items: ImageItemType[];
  onImageUpload: (file: File) => void;
  onDeleteImage: (id: string) => void;
  onUpdateLegend: (id: string, legend: string) => void;
}

const UnrankedSection = ({ 
  items, 
  onImageUpload, 
  onDeleteImage, 
  onUpdateLegend 
}: UnrankedSectionProps) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-200">Unranked Items</h2>
        <ImageUpload onImageUpload={onImageUpload} />
      </div>
      
      <Droppable droppableId="unranked" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[120px] bg-gray-900/95 border border-gray-800 
              rounded-md p-4 flex flex-wrap gap-2 relative group"
          >
            <div className="absolute -left-1 top-0 w-1 h-full bg-gray-600 group-hover:bg-gray-500 transition-colors" />
            {items.map((item, index) => (
              <ImageItem
                key={item.id}
                item={item}
                index={index}
                onDelete={onDeleteImage}
                onUpdateLegend={onUpdateLegend}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default UnrankedSection;
