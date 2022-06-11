
class GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    context: WeakRef<CanvasRenderingContext2D>;
    image: HTMLImageElement;
    constructor(x : number, y : number, width : number, height : number, image : string, context : CanvasRenderingContext2D){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        console.log(context)
        this.context = new WeakRef(context);

        const imageElement = new Image(width, height);
        imageElement.src = image;
        this.image = imageElement;
        
    }

    draw(){
        const context = this.context.deref();
        if(context){
            context.drawImage(this.image, (this.x - this.width / 2), (this.y - this.height / 2), this.width, this.height);
        }
    }
}

export default GameObject;