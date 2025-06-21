export interface AvatarUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export type AvatarUpdateStep = 'select' | 'crop'; 