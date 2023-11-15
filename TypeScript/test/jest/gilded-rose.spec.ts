import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  /**
   * TODO consider
   * Separate files for different categories of tests; this file will grow unwieldy
   * There should be tests for the shop itself to ensure it updates each item each day
   * separate from the tests for each type of item
   */

  describe('Managing SellIn for items', () => {
    /**
     * TODO consider
     * max and min SellIn limits
     * testing with different sellIn values
     */
    it.each([
      ['Aged Brie'],
      ['Backstage passes to a TAFKAL80ETC concert'],
      ['Potatoes']]
    )('should decrease SellIn each day for common item "%s" that has not reached its SellIn limit', (itemName:string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).toBe(0);
    })

    it.each([
      ['Aged Brie'],
      ['Backstage passes to a TAFKAL80ETC concert'],
      ['Potatoes']]
    )('common item "%s" can be past their SellIn limit', (itemName:string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, -5, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).toBe(-6);
    })

    it.each([
      ['Sulfuras, Hand of Ragnaros']]
    )('should not decrease SellIn each day for legendary item "%s"', (itemName:string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 1, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).toBe(1);
    })

  })

  describe('Managing Quality for items', () => {
    it.each([
      ['Apples']
    ])('should decrease Quality each day for common item "%s" that has not reached its SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 10, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(9);
    });

    it.each([
        ['Conjured'],
      ]
    )('should decrease Quality each day for conjured item "%s" that has not reached its SellIn limit', (itemName:string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 1, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(8);
    })

    it.each([
      ['Apples']
    ])('should decrease Quality each day for common item "%s" that has reached its SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(8);
    });

    it.each([
        ['Conjured'],
      ]
    )('should decrease Quality each day for conjured item "%s" that has reached its SellIn limit', (itemName:string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(6);
    })

    it.each([
      ['Aged Brie']
    ])('should increase Quality each day for item "%s" that ages well that has not reached the SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 10, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(11);
    });

    it.each([
      ['Aged Brie']
    ])('should not increase Quality beyond 50 for item "%s" that ages well that has not reached the SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 10, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it.each([
      ['Aged Brie']
    ])('should increase Quality each day for item "%s" that ages well that has reached the SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(12);
    });

    it.each([
      ['Aged Brie']
    ])('should not increase Quality beyond 50 for item "%s" that ages well that has reached the SellIn limit', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 0, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(50);
    });

    it.each([
      ['Sulfuras, Hand of Ragnaros']
    ])('should not decrease Quality each day for legendary item "%s"', (itemName: string) => {
      // Given
      const gildedRose = new GildedRose([new Item(itemName, 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(10);
    });

    it.each([
      ['Backstage passes to a TAFKAL80ETC concert', 1, 11 ],
      ['Backstage passes to a TAFKAL80ETC concert', 2, 10 ],
      ['Backstage passes to a TAFKAL80ETC concert', 2, 9 ],
      ['Backstage passes to a TAFKAL80ETC concert', 2, 6 ],
      ['Backstage passes to a TAFKAL80ETC concert', 3, 5 ],
      ['Backstage passes to a TAFKAL80ETC concert', 3, 1 ],
      ]
    )('should increase quality for "%s" by "%s" when there are "%s" days until the concert', (
      itemName:string, qualityChange: number, daysRemaining:number) => {
      // Given
      const initialQuality = 10;
      const gildedRose = new GildedRose([new Item(itemName, daysRemaining, initialQuality)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      let expectedQuality = initialQuality + qualityChange;
      expect(items[0].quality).toBe(expectedQuality);
    })

    it('should set ticket quality to 0 after a concert', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).toBe(0);
    })
  })

});
