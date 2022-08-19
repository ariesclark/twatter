const numberFormat = new Intl.NumberFormat("en", { notation: "compact", compactDisplay: "short" });

export function formatNumber(value: number): string {
	return numberFormat.format(value);
}
