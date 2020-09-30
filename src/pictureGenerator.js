export default class PictureGenerator {
    async getImageUrl() { 
        const data = await fetch("https://picsum.photos/500");
        const blob = await data.blob();
        return URL.createObjectURL(blob);
    }
}