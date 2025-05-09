declare module '*.jsx' {
  import React = require('react');
  const component: React.FC<any>;
  export default component;
}

declare module '*.json' {
  const value: any;
  export default value;
}

// For server-side .js files imported into .ts files.
// Consider converting these to .ts or providing more specific .d.ts files.
declare module '*.js';
