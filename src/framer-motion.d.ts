// Type fix for framer-motion with React 19
import 'framer-motion';
import { ReactNode } from 'react';

declare module 'framer-motion' {
  export interface MotionProps {
    children?: ReactNode;
  }
}
