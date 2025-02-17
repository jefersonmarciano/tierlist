import { Droppable } from '@hello-pangea/dnd';
import { TierRowProps } from '@/types';
import ImageItem from './ImageItem';

const TierRow = ({ rank, items, onDeleteImage, onUpdateLegend }: TierRowProps) => {
  const bgColors = {
    'S+': 'bg-red-800',
    'S': 'bg-red-700',
    'A': 'bg-orange-600',
    'B': 'bg-yellow-600',
    'C': 'bg-green-600',
    'D': 'bg-blue-600',
  };

  return (
    <div className="flex w-full mb-1 h-24 relative group">
      {/* Borda vermelha lateral */}
      <div className="absolute -left-1 top-0 w-1 h-full bg-red-600 group-hover:bg-red-500 transition-colors" />
      
      {/* Container principal com fundo escuro e borda */}
      <div className="flex w-full bg-gray-900/95 border border-gray-800 hover:border-gray-700 transition-colors">
        {/* Área do rank */}
        <div className={`${bgColors[rank]} w-24 flex items-center justify-center text-white font-bold text-3xl shadow-lg`}>
          {rank}
        </div>

        {/* Área das imagens */}
        <Droppable droppableId={rank} direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 flex gap-1 p-2 items-center overflow-x-auto"
            >
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
    </div>
  );
};

export default TierRow;
