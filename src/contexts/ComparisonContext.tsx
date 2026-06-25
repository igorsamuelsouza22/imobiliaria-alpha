import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Property } from '../types/property';

interface ComparisonContextType {
  selectedProperties: Property[];
  toggleProperty: (property: Property) => void;
  isSelected: (propertyId: string) => boolean;
  clearSelection: () => void;
  count: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const toggleProperty = useCallback((property: Property) => {
    setSelectedProperties(prev => {
      const index = prev.findIndex(p => p.id === property.id);
      if (index > -1) {
        return prev.filter(p => p.id !== property.id);
      } else {
        if (prev.length >= 3) {
          alert('Você só pode comparar até 3 imóveis por vez.');
          return prev;
        }
        return [...prev, property];
      }
    });
  }, []);

  const isSelected = useCallback((propertyId: string) => {
    return selectedProperties.some(p => p.id === propertyId);
  }, [selectedProperties]);

  const clearSelection = useCallback(() => {
    setSelectedProperties([]);
  }, []);

  const count = selectedProperties.length;

  return (
    <ComparisonContext.Provider value={{ selectedProperties, toggleProperty, isSelected, clearSelection, count }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
