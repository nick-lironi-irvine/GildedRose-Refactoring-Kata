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

      {
        // The amount that the SellIn of this item should change this day, positive or negative
        let sellInDelta = -1;

        // Determine how much SellIn should change for this item, given various factors
        switch (item.name) {
          case 'Sulfuras, Hand of Ragnaros':
            sellInDelta = 0;
            break;
          default:
            sellInDelta = -1;
        }

        // Apply the SellIn update
        item.sellIn = item.sellIn + sellInDelta
      }

      const isPastSellIn = item.sellIn < 0;

      {
        // The amount that the quality of this item should change this day, positive or negative
        let qualityDelta = -1;

        // Determine how much quality should change for this item, given various factors
        switch (item.name) {
          case 'Sulfuras, Hand of Ragnaros':
            qualityDelta = 0;
            break;
          case 'Aged Brie':
            if (isPastSellIn) {
              qualityDelta = 2
            } else {
              qualityDelta = 1
            }
            break;
          case 'Conjured':
            if (isPastSellIn) {
              qualityDelta = -4
            } else {
              qualityDelta = -2
            }
            break;
          case 'Backstage passes to a TAFKAL80ETC concert':
            if (item.sellIn < 0) {
              // After the concert the tickets are worthless
              qualityDelta = -item.quality
            } else if (item.sellIn < 5) {
              // They get really valuable closer to the date
              qualityDelta = 3
            } else if (item.sellIn < 10) {
              // They get more valuable close to the date
              qualityDelta = 2
            } else {
              // Else like normal
              qualityDelta = 1
            }
            break;
          default:
            if (isPastSellIn) {
              qualityDelta = -2
            } else {
              qualityDelta = -1
            }
        }

        // Apply the computed quality update
        item.quality = Math.min(item.quality + qualityDelta, maximumItemQuality);
      }

      // TODO consider returning a new Item here, not mutating the provided one
    }

    return this.items;
  }
}
