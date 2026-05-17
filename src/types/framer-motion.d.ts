// Type augmentation for framer-motion with React 19
import 'framer-motion';

declare module 'framer-motion' {
  import type { FC, ReactNode } from 'react';
  
  export interface AnimatePresenceProps {
    children?: ReactNode;
    initial?: boolean;
    mode?: 'wait' | 'sync' | 'popLayout';
    onExitComplete?: () => void;
    custom?: any;
    presenceAffectsLayout?: boolean;
  }
  
  export const AnimatePresence: FC<AnimatePresenceProps>;
}
