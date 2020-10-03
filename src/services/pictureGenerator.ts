import { ModeType } from "./ModeContext";

export default class PictureGenerator {
  async sleep(timeout: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  async getImageUrl(mode: ModeType, uploaded: string[], index: number) {
    if (mode === ModeType.random) {
      const data = await fetch("https://picsum.photos/500");
      const blob = await data.blob();
      return URL.createObjectURL(blob);
    } else if (mode === ModeType.upload) {
      if (index < uploaded.length) {
        return uploaded[index];
      }
    }
    return "";
  }
}
