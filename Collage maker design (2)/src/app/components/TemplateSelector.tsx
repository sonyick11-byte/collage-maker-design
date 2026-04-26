import { Layout } from 'lucide-react';
import { Button } from './ui/button';

export interface Template {
  id: string;
  name: string;
  slots: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    image: string | null;
  }>;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TEMPLATES: Template[] = [
  {
    id: 'grid-2x2',
    name: '2x2 Grid',
    slots: [
      { x: 10, y: 10, width: 390, height: 390, image: null },
      { x: 410, y: 10, width: 390, height: 390, image: null },
      { x: 10, y: 410, width: 390, height: 390, image: null },
      { x: 410, y: 410, width: 390, height: 390, image: null },
    ],
  },
  {
    id: 'grid-3x3',
    name: '3x3 Grid',
    slots: [
      { x: 10, y: 10, width: 260, height: 260, image: null },
      { x: 280, y: 10, width: 260, height: 260, image: null },
      { x: 550, y: 10, width: 260, height: 260, image: null },
      { x: 10, y: 280, width: 260, height: 260, image: null },
      { x: 280, y: 280, width: 260, height: 260, image: null },
      { x: 550, y: 280, width: 260, height: 260, image: null },
      { x: 10, y: 550, width: 260, height: 260, image: null },
      { x: 280, y: 550, width: 260, height: 260, image: null },
      { x: 550, y: 550, width: 260, height: 260, image: null },
    ],
  },
  {
    id: 'hero-left',
    name: 'Hero Left',
    slots: [
      { x: 10, y: 10, width: 490, height: 790, image: null },
      { x: 510, y: 10, width: 290, height: 390, image: null },
      { x: 510, y: 410, width: 290, height: 390, image: null },
    ],
  },
  {
    id: 'hero-top',
    name: 'Hero Top',
    slots: [
      { x: 10, y: 10, width: 790, height: 490, image: null },
      { x: 10, y: 510, width: 390, height: 290, image: null },
      { x: 410, y: 510, width: 390, height: 290, image: null },
    ],
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    slots: [
      { x: 10, y: 10, width: 390, height: 250, image: null },
      { x: 410, y: 10, width: 390, height: 250, image: null },
      { x: 10, y: 270, width: 260, height: 260, image: null },
      { x: 280, y: 270, width: 260, height: 260, image: null },
      { x: 550, y: 270, width: 250, height: 530, image: null },
      { x: 10, y: 540, width: 260, height: 260, image: null },
      { x: 280, y: 540, width: 260, height: 260, image: null },
    ],
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    slots: [
      { x: 50, y: 50, width: 300, height: 300, image: null },
      { x: 450, y: 100, width: 300, height: 300, image: null },
      { x: 150, y: 450, width: 300, height: 300, image: null },
    ],
  },
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Layout className="size-4" />
        <h3 className="font-medium">Templates</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((template) => (
          <Button
            key={template.id}
            variant={selectedTemplate === template.id ? 'default' : 'outline'}
            className="h-auto py-3"
            onClick={() => onSelectTemplate(template.id)}
          >
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
