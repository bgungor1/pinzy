
export { default as AddPinModal } from './AddPinModal';
export { default as PinDetailsModal } from './PinDetailsModal';
export { default as FilterByIdModal } from './FilterByIdModal';
export { default as FilterButtons } from './FilterButtons';
export { default as PinListItem } from './PinListItem';

export interface Pin {
    id: number;
    userId: number;
    title: string;
    description?: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
}
export type FilterMode = 'all' | 'my' | 'other';