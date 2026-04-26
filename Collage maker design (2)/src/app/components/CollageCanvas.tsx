import { useEffect, useRef } from 'react';

interface ImageSlot {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string | null;
}

interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface CollageCanvasProps {
  imageSlots: ImageSlot[];
  textOverlays: TextOverlay[];
  width: number;
  height: number;
  backgroundColor: string;
  onExport?: (dataUrl: string) => void;
}

export function CollageCanvas({ imageSlots, textOverlays, width, height, backgroundColor }: CollageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw images
    imageSlots.forEach((slot) => {
      if (slot.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.rect(slot.x, slot.y, slot.width, slot.height);
          ctx.clip();
          
          // Calculate aspect ratio fit
          const imgAspect = img.width / img.height;
          const slotAspect = slot.width / slot.height;
          
          let drawWidth, drawHeight, drawX, drawY;
          
          if (imgAspect > slotAspect) {
            drawHeight = slot.height;
            drawWidth = drawHeight * imgAspect;
            drawX = slot.x - (drawWidth - slot.width) / 2;
            drawY = slot.y;
          } else {
            drawWidth = slot.width;
            drawHeight = drawWidth / imgAspect;
            drawX = slot.x;
            drawY = slot.y - (drawHeight - slot.height) / 2;
          }
          
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();
          
          // Draw border
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
        };
        img.src = slot.image;
      } else {
        // Draw placeholder
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
        ctx.setLineDash([]);
      }
    });

    // Draw text overlays
    textOverlays.forEach((overlay) => {
      ctx.font = `${overlay.fontSize}px ${overlay.fontFamily}`;
      ctx.fillStyle = overlay.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text shadow for better visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(overlay.text, overlay.x, overlay.y);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });
  }, [imageSlots, textOverlays, width, height, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="max-w-full h-auto border border-gray-300 rounded-lg shadow-lg"
    />
  );
}
