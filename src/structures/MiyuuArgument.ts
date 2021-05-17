import { MiyuuPiece } from "../classes/MiyuuPiece";

export class MiyuuArgument extends MiyuuPiece {
	async run(): Promise<void> {
		// Implemented in child classes
		// Parameters:
		// argument: string
		// possible: Possible
		// message: MiyuuMessage
	}

	static verify(value: number, min: number = null, max: number = null): boolean {
		if (min !== null && max !== null) {
			return value >= min && value <= max;
		}
		if (min !== null) {
			return value >= min;
		}
		if (max !== null) {
			return value <= max;
		}
		return true;
	}
}
