export class MineralModel {
    constructor({
        id = crypto.randomUUID(),
        name = '',
        color = '',
        origin = '',
        images = []
    } = {}) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.origin = origin;
        this.images = images;
    }

    static fromJSON(json) {
        return new MineralModel(json);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            origin: this.origin,
            images: this.images
        };
    }
}