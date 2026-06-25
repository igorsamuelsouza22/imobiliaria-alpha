import { useState, useCallback } from 'react';
import type { Property } from '../types/property';

export function useComparison() {
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

  return {
    selectedProperties,
    toggleProperty,
    isSelected,
    clearSelection,
    count,
  };
}
