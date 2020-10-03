import imageCompression from "browser-image-compression";

export async function compress(image: File): Promise<File> {
  const compressed = await imageCompression(image, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  });

  return new File([compressed], image.name);
}
