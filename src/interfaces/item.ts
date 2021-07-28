export interface item {
	sell: number; // Market price to sell at.
	name: string; // Name of the item
	emote: string; // The unicode emote for the item
	category: string; // The name of the table in the DB
	subcategory: string; // Any subcategory of the table
	recipe: [
		// Array of items needed to craft. Needs an item name (string) and amount to craft with (number)
		[string, number]
	];
}
