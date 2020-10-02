export default class PictureGenerator {
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getImageUrl() {
    const data = await fetch("https://picsum.photos/500");
    const blob = await data.blob();
    //await this.sleep(1000);
    return URL.createObjectURL(blob);
  }
}
