export class Card {

  public id: string;
  public name: string;
  public image:  File | string | undefined;
  public description: string;
  public level?: number | null;
  public cost?: number | null;
  public element?: string | File | null;
  public icon?: string | File | null;
  public defense?: string | null | undefined;
  public range?: string | null | undefined;
  public duration?: string | null | undefined;
  public objectUrl?: string | undefined;

  constructor(name: string = '', image: string | File | undefined = undefined, description: string = '', cost: number | null = null) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.image = image;
    this.cost = cost;
    this.description = description
  }

  createImageUrl(): string {

    console.log(this.image)
    console.log(this.image?.name)

    if (!this.image) return '/img/placeholder.png';

    if (typeof this.image === 'string') return this.image;

    if (!this.objectUrl) {
      this.objectUrl = URL.createObjectURL(this.image);
    }

    return this.objectUrl;
  }

  destroy():void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = undefined;
    }
  }

}
