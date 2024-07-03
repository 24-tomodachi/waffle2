export default class GameObject {
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

    update() {}

    #loadImage() {
        if(!this.imgPath) return;
        const img = new Image();
        img.src = this.imgPath;
        img.onload = () => {
            this.img = img;
        };
    }

    isCollidingWith = (obj) => {
        const isXOverlapped = this.x < (obj.x + obj.width) &&
            (this.x + this.width) > obj.x ||
            obj.x < (this.x + this.width) &&
            (obj.x + obj.width) > this.x;

        const isYOverlapped = this.y < (obj.y + obj.height) &&
            (this.y + this.height) > obj.y ||
            obj.y < (this.y + this.height) &&
            (obj.y + obj.height) > this.y;

        return isXOverlapped && isYOverlapped;
    };
}
