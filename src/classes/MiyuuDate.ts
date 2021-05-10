import { Months } from "../consts/months";

interface DateDisplay {
	year: "numeric" | "2-digit";
	month: "numeric" | "2-digit" | "long" | "short" | "narrow";
	day: "numeric" | "2-digit";
	hour: "numeric" | "2-digit";
	minute: "numeric" | "2-digit";
}

export class DateOptions {
	locale: string;
	display: DateDisplay;
}

export class MiyuuDate extends DateOptions {
	locale = "en-CA";
	display: DateDisplay = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	};
	months = Months;

	constructor(settings?: DateOptions) {
		super();
		if (!settings) {
			return;
		}
		if (settings.locale) {
			this.setLocale(settings.locale);
		}
		if (settings.display) {
			this.setDisplay(settings.display);
		}
	}

	setLocale(locale: string): void {
		this.locale = locale;
	}

	setDisplay(display: DateDisplay): void {
		if (display.year) {
			this.display.year = display.year;
		}
		if (display.month) {
			this.display.month = display.month;
		}
		if (display.day) {
			this.display.day = display.day;
		}
		if (display.hour) {
			this.display.hour = display.hour;
		}
		if (display.minute) {
			this.display.minute = display.minute;
		}
	}

	getLocaleString(date: Date): string {
		return date.toLocaleString(this.locale, this.display);
	}

	/**
	 * Combines a specific label with a count
	 */
	private properLabel(time: number, label: string): string {
		if (time === 0) {
			return null;
		}
		if (time === 1) {
			return ` ${time} ${label}`;
		}

		return ` ${time} ${label}s`;
	}

	/**
	 * Creates a human readable string from a process.uptime.
	 */
	elapsedTime(time: number): string {
		const second = Math.floor(time / 1000);
		const minute = Math.floor(second / 60);
		const hour = Math.floor(minute / 60);
		const day = Math.floor(hour / 24);

		//Time and display correction.
		let lblTime = [
			this.properLabel(second % 60, "second"),
			this.properLabel(minute % 60, "minute"),
			this.properLabel(hour % 24, "hour"),
			this.properLabel(day, "day")
		];
		lblTime = lblTime.filter(function (t) {
			return t;
		});
		if (lblTime.length > 1) {
			lblTime[0] = ` and ${lblTime[0]}`;
		} //Adds an "and" to sound better in the display
		lblTime.reverse();

		if (lblTime.length === 2) {
			return lblTime.join("");
		} //Commas for two items is bad English.
		return lblTime.join();
	}

	/**
	 * Creates a human readable date from a date object
	 */
	dateMaker(date: Date): string {
		return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	}

	/**
	 * Creates a full human readable timestamp from a date object
	 */
	timeMaker(date: Date): string {
		return `${this.dateMaker(date)} at ${date.getHours()}:${date.getMinutes()}`;
	}
}
