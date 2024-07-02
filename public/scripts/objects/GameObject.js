export class GameObject {
    constructor(x, y, width, height, imgPath, color="black") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.imgPath = imgPath;

        this.img = null;
        this.#loadImage();
    }

    #loadImage() {
        const img = new Image();
        img.src = this.imgPath;
        img.onload = () => {
            this.img = img;
        };
        img.onerror = (error) => {
            console.error('Failed to load image:', error);
        };
    }
}
