function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export type CropArea = { x: number; y: number };

/**
 * Export a square crop from the viewport using pan (crop) and zoom,
 * matching the preview in TeamPhotoField.
 */
export async function getCroppedImageBlob(
  imageSrc: string,
  crop: CropArea,
  zoom: number,
  viewportSize: number,
  outputSize = 800,
  mimeType: 'image/jpeg' | 'image/png' = 'image/jpeg',
  quality = 0.92
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  const baseScale = Math.max(viewportSize / naturalWidth, viewportSize / naturalHeight);
  const scale = baseScale * zoom;
  const drawnWidth = naturalWidth * scale;
  const drawnHeight = naturalHeight * scale;

  const offsetX = (viewportSize - drawnWidth) / 2 + crop.x;
  const offsetY = (viewportSize - drawnHeight) / 2 + crop.y;

  const sourceX = Math.max(0, -offsetX / scale);
  const sourceY = Math.max(0, -offsetY / scale);
  const sourceWidth = Math.min(naturalWidth - sourceX, viewportSize / scale);
  const sourceHeight = Math.min(naturalHeight - sourceY, viewportSize / scale);

  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    outputSize,
    outputSize
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create image blob'))),
      mimeType,
      quality
    );
  });
}
