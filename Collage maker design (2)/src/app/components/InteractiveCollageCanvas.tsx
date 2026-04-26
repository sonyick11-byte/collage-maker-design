import { useRef, useEffect, useState } from 'react';

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

interface InteractiveCollageCanvasProps {
  imageSlots: ImageSlot[];
  textOverlays: TextOverlay[];
  width: number;
  height: number;
  backgroundColor: string;
  selectedSlot: number | null;
  onSlotClick: (index: number) => void;
  selectedTextId: string | null;
  onTextClick: (id: string) => void;
  onTextDrag: (id: string, x: number, y: number) => void;
}

export function InteractiveCollageCanvas({
  imageSlots,
  textOverlays,
  width,
  height,
  backgroundColor,
  selectedSlot,
  onSlotClick,
  selectedTextId,
  onTextClick,
  onTextDrag,
}: InteractiveCollageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draggingText, setDraggingText] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw images
    imageSlots.forEach((slot, index) => {
      if (slot.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.rect(slot.x, slot.y, slot.width, slot.height);
          ctx.clip();

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
          ctx.strokeStyle = selectedSlot === index ? '#3b82f6' : '#ffffff';
          ctx.lineWidth = selectedSlot === index ? 4 : 2;
          ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
        };
        img.src = slot.image;
      } else {
        // Draw placeholder
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
        ctx.strokeStyle = selectedSlot === index ? '#3b82f6' : '#d1d5db';
        ctx.lineWidth = selectedSlot === index ? 4 : 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
        ctx.setLineDash([]);

        // Draw upload icon placeholder
        ctx.fillStyle = '#9ca3af';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Click to add image', slot.x + slot.width / 2, slot.y + slot.height / 2);
      }
    });

    // Draw text overlays
    textOverlays.forEach((overlay) => {
      ctx.font = `${overlay.fontSize}px ${overlay.fontFamily}`;
      ctx.fillStyle = overlay.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Add text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillText(overlay.text, overlay.x, overlay.y);

      // Draw selection box
      if (selectedTextId === overlay.id) {
        const metrics = ctx.measureText(overlay.text);
        const textWidth = metrics.width;
        const textHeight = overlay.fontSize;

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          overlay.x - textWidth / 2 - 10,
          overlay.y - textHeight / 2 - 5,
          textWidth + 20,
          textHeight + 10
        );
        ctx.setLineDash([]);
      }

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [imageSlots, textOverlays, selectedSlot, selectedTextId, backgroundColor]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Check if clicked on text
    const ctx = canvas.getContext('2d');
    if (ctx) {
      for (let i = textOverlays.length - 1; i >= 0; i--) {
        const overlay = textOverlays[i];
        ctx.font = `${overlay.fontSize}px ${overlay.fontFamily}`;
        const metrics = ctx.measureText(overlay.text);
        const textWidth = metrics.width;
        const textHeight = overlay.fontSize;

        if (
          x >= overlay.x - textWidth / 2 - 10 &&
          x <= overlay.x + textWidth / 2 + 10 &&
          y >= overlay.y - textHeight / 2 - 5 &&
          y <= overlay.y + textHeight / 2 + 5
        ) {
          onTextClick(overlay.id);
          return;
        }
      }
    }

    // Check if clicked on image slot
    for (let i = 0; i < imageSlots.length; i++) {
      const slot = imageSlots[i];
      if (x >= slot.x && x <= slot.x + slot.width && y >= slot.y && y <= slot.y + slot.height) {
        onSlotClick(i);
        return;
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      for (let i = textOverlays.length - 1; i >= 0; i--) {
        const overlay = textOverlays[i];
        ctx.font = `${overlay.fontSize}px ${overlay.fontFamily}`;
        const metrics = ctx.measureText(overlay.text);
        const textWidth = metrics.width;
        const textHeight = overlay.fontSize;

        if (
          x >= overlay.x - textWidth / 2 - 10 &&
          x <= overlay.x + textWidth / 2 + 10 &&
          y >= overlay.y - textHeight / 2 - 5 &&
          y <= overlay.y + textHeight / 2 + 5
        ) {
          setDraggingText(overlay.id);
          setDragOffset({ x: x - overlay.x, y: y - overlay.y });
          return;
        }
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggingText) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    onTextDrag(draggingText, x - dragOffset.x, y - dragOffset.y);
  };

  const handleMouseUp = () => {
    setDraggingText(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="max-w-full h-auto border border-gray-300 rounded-lg shadow-lg cursor-pointer"
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
