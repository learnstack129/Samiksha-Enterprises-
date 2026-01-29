import type { LucideIcon } from 'lucide-react';
import {
  Wrench,
  PaintRoller,
  Droplets,
  Building,
  Warehouse,
  ShieldHalf,
  Truck,
  Printer,
  GlassWater,
} from 'lucide-react';

export type Service = {
  title: string;
  icon: LucideIcon;
};

export type ServiceCategory = {
  category: string;
  icon: LucideIcon;
  services: Service[];
};

export const serviceData: ServiceCategory[] = [
  {
    category: 'Civil & Interior Works',
    icon: Wrench,
    services: [
      { title: 'POP Work (Plaster of Paris)', icon: PaintRoller },
      { title: 'Painting & Commercial Polishing', icon: PaintRoller },
      { title: 'Plumbing & Waterproofing', icon: Droplets },
      { title: 'Aluminium & Glass Work', icon: GlassWater },
    ],
  },
  {
    category: 'Fabrication & Engineering',
    icon: Building,
    services: [
      { title: 'Industrial Sheds & Roofing', icon: Warehouse },
      { title: 'Heavy Structural Fabrication', icon: Building },
      { title: 'Gates, Grills & Railings', icon: ShieldHalf },
    ],
  },
  {
    category: 'Trading & Supply',
    icon: Truck,
    services: [
      { title: 'Industrial Material Supply (Trading)', icon: Truck },
      { title: 'Corporate Printing Services', icon: Printer },
    ],
  },
];
