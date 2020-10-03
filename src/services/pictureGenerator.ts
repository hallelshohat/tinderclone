import { ModeType } from "./ModeContext";

export default class PictureGenerator {
  async getImageUrl(mode: ModeType) {
    if (mode === ModeType.random) {
      const data = await fetch("https://picsum.photos/500");
      const blob = await data.blob();
      return URL.createObjectURL(blob);
    } else if (mode === ModeType.upload) {
      return "http://www.duckdns.org/img/patreon.png";
    } else {
      return "";
    }
  }
}
