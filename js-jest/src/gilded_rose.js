class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            if (this.items[i].quality > 50) {
              this.items[i].quality = 50;
              this.items[i].quality--;
            } else {
              if (this.items[i].name === "Conjured") {
                this.items[i].quality = this.items[i].quality - 2;
              } else {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

// Pretty simple, right? Well this is where it gets interesting:

// 	- Once the sell by date has passed, Quality degrades twice as fast
// 	- The Quality of an item is never negative
// 	- "Aged Brie" actually increases in Quality the older it gets
// 	- The Quality of an item is never more than 50
// 	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// 	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// 	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// 	Quality drops to 0 after the concert

// We have recently signed a supplier of conjured items. This requires an update to our system:

// 	- "Conjured" items degrade in Quality twice as fast as normal items

// Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
// still works correctly. However, do not alter the Item class or Items property as those belong to the
// goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
// ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
// for you).

// Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
// legendary item and as such its Quality is 80 and it never alters.


module.exports = {
  Item,
  Shop
}
