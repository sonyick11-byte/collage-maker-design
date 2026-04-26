import { useState } from 'react';
import { Type, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface TextOverlay {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface TextOverlayEditorProps {
  textOverlays: TextOverlay[];
  onAddText: () => void;
  onUpdateText: (id: string, updates: Partial<TextOverlay>) => void;
  onDeleteText: (id: string) => void;
  selectedTextId: string | null;
  onSelectText: (id: string | null) => void;
}

export function TextOverlayEditor({
  textOverlays,
  onAddText,
  onUpdateText,
  onDeleteText,
  selectedTextId,
  onSelectText,
}: TextOverlayEditorProps) {
  const selectedText = textOverlays.find((t) => t.id === selectedTextId);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="size-4" />
          <h3 className="font-medium">Text Overlays</h3>
        </div>
        <Button size="sm" onClick={onAddText}>
          <Plus className="size-4 mr-1" />
          Add Text
        </Button>
      </div>

      {textOverlays.length === 0 && (
        <p className="text-sm text-gray-500">No text overlays yet. Click "Add Text" to get started.</p>
      )}

      <div className="space-y-2">
        {textOverlays.map((overlay) => (
          <div
            key={overlay.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedTextId === overlay.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectText(overlay.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium truncate flex-1">{overlay.text || 'Empty text'}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteText(overlay.id);
                }}
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedText && (
        <div className="p-4 border rounded-lg space-y-3 bg-white">
          <h4 className="font-medium text-sm">Edit Text</h4>
          
          <div className="space-y-2">
            <Label htmlFor="text-content">Text</Label>
            <Input
              id="text-content"
              value={selectedText.text}
              onChange={(e) => onUpdateText(selectedText.id, { text: e.target.value })}
              placeholder="Enter text..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                type="number"
                value={selectedText.fontSize}
                onChange={(e) => onUpdateText(selectedText.id, { fontSize: parseInt(e.target.value) || 32 })}
                min="12"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Color</Label>
              <Input
                id="text-color"
                type="color"
                value={selectedText.color}
                onChange={(e) => onUpdateText(selectedText.id, { color: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              value={selectedText.fontFamily}
              onValueChange={(value) => onUpdateText(selectedText.id, { fontFamily: value })}
            >
              <SelectTrigger id="font-family">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Courier New">Courier New</SelectItem>
                <SelectItem value="Verdana">Verdana</SelectItem>
                <SelectItem value="Impact">Impact</SelectItem>
                <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="text-x">X Position</Label>
              <Input
                id="text-x"
                type="number"
                value={selectedText.x}
                onChange={(e) => onUpdateText(selectedText.id, { x: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-y">Y Position</Label>
              <Input
                id="text-y"
                type="number"
                value={selectedText.y}
                onChange={(e) => onUpdateText(selectedText.id, { y: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
