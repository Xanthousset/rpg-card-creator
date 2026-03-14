export class Card {

  public id: string;
  public name: string;
  public image:  File | string | undefined;
  public description: string;
  public level?: number | null;
  public icon?: string | File | null;
  public cost?: number | null;
  public defense?: string | null | undefined;

  constructor(name: string = '', image: string | File | undefined = undefined, description: string = '', cost: number | null = null) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.image = image;
    this.cost = cost;
    this.description = description
  }

  createImageUrl(): string {
    if(this.image === null || this.image === undefined) {
      return '/img/placeholder.png';
    }
    if(typeof this.image === 'string') {
      return this.image;
    }
    return URL.createObjectURL(this.image)
  }


}
