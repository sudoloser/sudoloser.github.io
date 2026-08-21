import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-clock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ds-calendar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
