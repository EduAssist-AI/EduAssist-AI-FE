/**
 * Helper function to get public image paths
 * Works with both development and GitHub Pages deployment
 */
export const getImagePath = (path: string): string => {
  // For GitHub Pages, images are in the EduAssist-AI-FE/images/ folder
  // For local dev, they're at /images/
  const basePath = import.meta.env.BASE_URL;
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${basePath}${cleanPath}`;
};
