import { useState, useRef, useEffect } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function Slider({ min, max, step = 1, value, onChange }: SliderProps) {
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };
  
  const minPos = getPercentage(value[0]);
  const maxPos = getPercentage(value[1]);
  
  const handleMouseDown = (handle: 'min' | 'max') => {
    setDragging(handle);
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newValue = Math.round(min + position * (max - min));
    
    if (dragging === 'min') {
      const clampedValue = Math.min(Math.max(newValue, min), value[1] - step);
      onChange([clampedValue, value[1]]);
    } else {
      const clampedValue = Math.min(Math.max(newValue, value[0] + step), max);
      onChange([value[0], clampedValue]);
    }
  };
  
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, value]);
  
  return (
    <div className="relative py-4">
      <div 
        ref={trackRef}
        className="w-full h-1 bg-gray-200 rounded-full"
      >
        <div 
          className="absolute h-1 bg-primary-500 rounded-full"
          style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
        />
      </div>
      
      <div 
        className="absolute w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        style={{ left: `${minPos}%`, top: '50%' }}
        onMouseDown={() => handleMouseDown('min')}
        tabIndex={0}
      />
      
      <div 
        className="absolute w-4 h-4 bg-white border-2 border-primary-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        style={{ left: `${maxPos}%`, top: '50%' }}
        onMouseDown={() => handleMouseDown('max')}
        tabIndex={0}
      />
    </div>
  );
}
