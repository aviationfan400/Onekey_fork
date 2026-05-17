/** Resolve team member image paths (local public assets vs Firebase / data URLs). */
export function resolveTeamImageSrc(image: string | undefined | null): string | null {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image;
  }
  const path = image.startsWith('/') ? image : `/${image}`;
  return `${process.env.PUBLIC_URL}${path}`;
}
