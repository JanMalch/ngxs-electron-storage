export class EnsuringMap<K, V> implements Iterable<[K, V]> {

    private readonly map;

    constructor(private readonly ensureFn: (key: K) => V, init?: Iterable<[K, V]>) {
        this.map = new Map<K, V>(init);
    }

    get size(): number {
        return this.map.size;
    }

    clear(): void {
        this.map.clear();
    }

    delete(key: K): boolean {
        return this.map.delete(key);
    }

    entries(): IterableIterator<[K, V]> {
        return this.map.entries();
    }

    forEach(callbackfn: (value: V, key: K, map: EnsuringMap<K, V>) => void, thisArg?: any) {
        this.map.forEach((v, k) => callbackfn(v, k, this), thisArg);
    }

    get(key: K): V {
        if (!this.map.has(key)) {
            this.map.set(key, this.ensureFn(key));
        }
        return this.map.get(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    set(key: K, value: V): this {
        this.map.set(key, value);
        return this;
    }

    keys(): IterableIterator<K> {
        return this.map.keys();
    }

    values(): IterableIterator<V> {
        return this.map.values();
    }

    get [Symbol.toStringTag](): string {
        return 'EnsuringMap';
    }

    [Symbol.iterator]() {
        return this.map[Symbol.iterator]();
    }
}/*

export class EnsuringMap<K, V> extends Map<K, V> {
    constructor(private readonly ensureFn: (key: K) => V, init?: Iterable<[K, V]>) {
        super(init);
    }

    get(key: K): V {
        if (!this.has(key)) {
            this.set(key, this.ensureFn(key));
        }
        return super.get(key);
    }
}
*/
