export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name:string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const maximumItemQuality = 50;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    for (const item of this.items) {
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality--;
          }
        }
      } else {
        if (item.quality < maximumItemQuality) {
          item.quality++;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < maximumItemQuality) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < maximumItemQuality) {
                item.quality++;
              }
            }
          }
        }
      }
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }
      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality--;
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < maximumItemQuality) {
            item.quality++;
          }
        }
      }
    }

    return this.items;
  }
}
