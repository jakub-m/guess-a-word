import { BloomFilter } from "./filter";
import { filterData } from "./filter_data";

export class Dict {
  _filter: BloomFilter;
  constructor() {
    this._filter = new BloomFilter({ data: filterData, hashCount: 10 });
  }

  contains(w: string): boolean {
    // The dict was produced with lower-case words.
    return this._filter.contains(w.toLowerCase());
  }
}
