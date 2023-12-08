export type PriceTierListItemProps = {
	maximum_price: number;
	maximum_price_display: string;
	maximum_price_monthly_display: string;
	maximum_units: number;
	minimum_price: number;
	minimum_price_display: string;
	minimum_price_monthly_display: string;
	minimum_units: number;
	per_unit_fee?: number;
};

export type StatsPlanTierUI = {
	price: string | undefined;
	description?: string;
	views: string | number | undefined;
	extension?: boolean;
	per_unit_fee?: number;
};

// TODO: Break this down.
// Ideally we'd have a type describing the plan strategy (steps, increments, etc)
// and leave the UI stuff (emoji threasholds, etc) to the UI layer.
export type StatsPWYWSliderSettings = {
	sliderStepPrice: number;
	minSliderPrice: number;
	maxSliderPrice: number;
	uiEmojiHeartTier: number;
	uiImageCelebrationTier: number;
};
