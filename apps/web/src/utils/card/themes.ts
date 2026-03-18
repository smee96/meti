// Card theme definitions
export interface Theme {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const THEMES: Theme[] = [
  { id: 'deep-navy', name: 'Deep Navy', color: '#0A2260', description: '신뢰감 있는 클래식 네이비' },
  { id: 'midnight-teal', name: 'Midnight Teal', color: '#0D3D4D', description: '세련된 청록색' },
  { id: 'forest-deep', name: 'Forest Deep', color: '#1A3D2E', description: '자연의 깊은 초록' },
  { id: 'royal-burgundy', name: 'Royal Burgundy', color: '#4A1E2E', description: '고급스러운 버건디' },
  { id: 'charcoal-dark', name: 'Charcoal Dark', color: '#1C1C1E', description: '모던한 차콜' },
  { id: 'slate-blue', name: 'Slate Blue', color: '#2C3E50', description: '중후한 슬레이트 블루' },
  { id: 'deep-purple', name: 'Deep Purple', color: '#3D2857', description: '창의적인 딥 퍼플' },
  { id: 'warm-brown', name: 'Warm Brown', color: '#3E2723', description: '따뜻한 브라운' },
  { id: 'olive-night', name: 'Olive Night', color: '#3D4A2C', description: '차분한 올리브' },
  { id: 'sunset-orange', name: 'Sunset Orange', color: '#8B4513', description: '따뜻한 석양' },
];

export const THEME_COLORS: Record<string, string> = {
  'deep-navy': '#0A2260',
  'midnight-teal': '#0D3D4D',
  'forest-deep': '#1A3D2E',
  'royal-burgundy': '#4A1E2E',
  'charcoal-dark': '#1C1C1E',
  'slate-blue': '#2C3E50',
  'deep-purple': '#3D2857',
  'warm-brown': '#3E2723',
  'olive-night': '#3D4A2C',
  'sunset-orange': '#8B4513'
};
