export interface MiyuuDBOptions {
	provider: string;
	SQLiteDirectory?: string;
	host?: string;
	port?: number;
	username?: string;
	password?: string;
}

export interface MiyuuDB {
	/**
	 * Initialize the database setup.
	 */
	initialize(): void;

	/**
	 * Create a new user in the database
	 * @param {String} userID - The user's unique Discord ID.
	 * @param {Number} credits - The number of credits to give the user initially.
	 * @returns {Boolean} Returns true or false depending if the user was added to the database.
	 */
	add(userID: string, credits: number): Promise<boolean>;

	/**
	 * Fetch the user's data from a specific collection.
	 * @param {String} collection - The collection name to pull from.
	 * @param {String} userID - The user's unique Discord ID.
	 * @returns Either null if no data is found or an object containing the user's data.
	 */
	get(collection: string, userID: string): Promise<unknown>;

	/**
	 * Update a specific value within the database
	 * @param {String} collection - The table to target
	 * @param {String} userID - The user's unique Discord ID
	 * @param {String} key - The column name to edit
	 * @param {Any} value - The value to replace.
	 * @returns {Boolean} Returns true or false depending if the action was successful.
	 */
	update(collection: string, userID: string, key: string, value): Promise<boolean>;

	/**
	 * Delete all references of a user from the database.
	 * @param {String} userID - The user's unique Discord ID
	 * @returns {Boolean} Returns true or false depending if the action was successful.
	 */
	delete(userID: string): Promise<boolean>;

	/**
	 * Export data out of a database for transfer to a different storage system.
	 *
	 * This should be used outside of normal operation as this is meant to transfer to
	 * a new database!
	 *
	 * @returns {Object} The data export from the database if successful.
	 */
	export(): Promise<unknown>;

	/**
	 * Import data into a database.
	 *
	 * This should be used outside of normal operation as this is meant to transfer to
	 * a new database!
	 *
	 * @param {Object} data - A data object from the export function.
	 */
	import(data: unknown, options?: MiyuuDBOptions): Promise<boolean>;
}
