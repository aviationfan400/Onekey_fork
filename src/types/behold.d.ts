// Type declaration for the Behold.so Instagram widget custom element.
// Lets us use <behold-widget feed-id="..."> in JSX without TS errors.
import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'behold-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 'feed-id': string },
        HTMLElement
      >;
    }
  }
}

export {};
