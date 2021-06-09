interface SingleReturn {
	value?: unknown;
	done: boolean;
}

interface MultiReturn extends SingleReturn {
	key?: unknown;
}

function MiyuuSingleIterator(values: unknown[]) {
	let counter = 0;
	return {
		next: function () {
			if (counter < values.length) {
				return {
					value: values[counter++],
					done: false
				};
			}
			return { done: true };
		}
	};
}

function MiyuuMultiIterator(keys: unknown[], values: unknown[]) {
	let counter = 0;
	return {
		next: function () {
			if (counter < values.length) {
				return {
					key: keys[counter++],
					value: values[counter++],
					done: false
				};
			}
			return { done: true };
		}
	};
}

export class MiyuuCollection<K extends string, V> {
	private myKeys: K[] = [];
	private myValues: V[] = [];
	readonly prototype: MiyuuCollection<K, V>;
	readonly [Symbol.species]: MiyuuCollection<K, V>;

	constructor(iterable?: Iterator<[K, V]>) {
		let myIterable = iterable.next();
		while (myIterable.done) {
			this.myKeys.push(myIterable.value[0]);
			this.myValues.push(myIterable.value[1]);

			myIterable = iterable.next();
		}
	}

	[Symbol.iterator](): {
		next: () => MultiReturn;
	} {
		return MiyuuMultiIterator(this.myKeys, this.myValues);
	}

	get(key: K): null | V {
		const myIndex = this.myKeys.indexOf(key);
		if (myIndex === -1) {
			return null;
		}
		return this.myValues[myIndex];
	}

	clear(): void {
		this.myKeys = [];
		this.myValues = [];
	}

	delete(key: K): boolean {
		const myIndex = this.myKeys.indexOf(key);
		if (myIndex === -1) {
			return false;
		}

		this.myKeys = this.myKeys.splice(myIndex, 1);
		this.myValues = this.myValues.splice(myIndex, 1);

		return false;
	}

	has(key: K): boolean {
		return this.myKeys.includes(key);
	}

	set(key: K, value: V): this {
		this.myKeys.push(key);
		this.myValues.push(value);
		return this;
	}

	keys(): {
		next: () => SingleReturn;
	} {
		return MiyuuSingleIterator(this.myKeys);
	}

	values(): {
		next: () => SingleReturn;
	} {
		return MiyuuSingleIterator(this.myValues);
	}

	entries(): {
		next: () => MultiReturn;
	} {
		return MiyuuMultiIterator(this.myKeys, this.myValues);
	}

	size(): number {
		return this.myKeys.length;
	}

	forEach(callback: (value: V, index: number, collection: this) => void): void {
		for (let x = 0; x < this.size(); x++) {
			callback(this.values[x], x, this);
		}
	}
}
