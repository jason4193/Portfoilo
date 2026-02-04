/// <reference types="vite/client" />

// Vite asset URL imports
declare module "*.glb?url" {
  const url: string;
  export default url;
}

