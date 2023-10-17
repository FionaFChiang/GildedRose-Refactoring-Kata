const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it ("should degrade twice as fast past sell by date", function() {
    const gildedRose = new Shop([new Item("Quality", -1, 10)]);
    const items = gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it ("should not have a negative quality", function() {
    const gildedRose = new Shop([new Item("Villager", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  it ("Aged Brie actually increases in Quality the older it gets", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    for (let i = 0; i < 10; i++) {
      gildedRose.updateQuality();
    }

    expect(items[0].quality).toBe(27);
  })

  it ("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([new Item("FrostMourne", 50, 60)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(49)
  })

  it ("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  })

  it ("Sulfuras doesn't decrease in quality even after 1000 days", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateQuality();
    for (let i = 0; i < 1000; i++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(80);
  })

  it ("Backstage passes, like aged brie, increases in Quality as its SellIn value approaches", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();

    for(let i = 0; i < 4; i++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(25);
  })

  it ("Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);

    for (let i = 0; i < 6; i++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(26);

    for (let i = 0; i < 4; i++) {
      gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(0);
  });

  // it ("should return true if Conjured item", function() {
  //   const gildedRose = new Shop([new Item("Conjured Imp", 2, 3)]);
  //   const items = gildedRose.updateQuality();
  //   console.log(items)
  //   var PATTERN = /conjured/,
  //   filtered = items.filter(function (str) { return str.includes(PATTERN); });
  //   console.log(filtered)
  // });

  it ("should return true if Conjured item", function() {
    const gildedRose = new Shop([new Item("Conjured", 2, 3)]);
    const items = gildedRose.updateQuality();

    items[0].name === "Conjured" ? true : false; 
  });

  it ("should decrease twice as fast if Conjured item", function() {
    const gildedRose = new Shop([new Item("Conjured", 2, 10)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(8);
  });
});