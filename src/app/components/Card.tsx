import React from "react";

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  status,
  species,
  onClick,
}) => {
  const statusColors = {
    'Alive': 'bg-green-500',
    'Dead': 'bg-red-500',
    'unknown': 'bg-gray-400'
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full"
      onClick={onClick}
    >
      {/* Imagen con lazy loading y overlay en hover */}
      {imageUrl && (
        <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
          <img 
            src={imageUrl} 
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {status && (
            <div className="absolute top-3 right-3">
              <span className={`${statusColors[status]} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}>
                {status}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        {species && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">🧬</span>
            <span className="text-sm text-gray-600 font-medium">{species}</span>
          </div>
        )}
        
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mt-auto">
            {description}
          </p>
        )}
      </div>
      
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};
