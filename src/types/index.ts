export type TierRank = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
export type ImageSize = 'small' | 'normal' | 'large';

export interface ImageItem {
  id: string;
  url: string;
  tier?: TierRank;
  legend?: string;
  size?: ImageSize;
}

export interface TierRowProps {
  rank: TierRank;
  items: ImageItem[];
  onDeleteImage: (id: string) => void;
  onUpdateLegend: (id: string, legend: string) => void;
}