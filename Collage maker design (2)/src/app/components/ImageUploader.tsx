import { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploaderProps {
  onImageSelect: (dataUrl: string) => void;
  selectedSlot: number | null;
  slotCount: number;
}

export function ImageUploader({ onImageSelect, selectedSlot, slotCount }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onImageSelect(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ImageIcon className="size-4" />
        <h3 className="font-medium">Images</h3>
      </div>
      
      {selectedSlot !== null ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Slot {selectedSlot + 1} of {slotCount} selected
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="size-4 mr-2" />
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="p-4 border border-dashed rounded-lg text-center">
          <p className="text-sm text-gray-500">
            Click on a slot in the canvas to upload an image
          </p>
        </div>
      )}
    </div>
  );
}
