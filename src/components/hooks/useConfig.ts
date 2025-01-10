import { useContext } from 'react';
import { ConfigContext } from '@/components/contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig() {
  return useContext(ConfigContext);
}
