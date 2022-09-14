export const capitalize = <T extends string>(value: T): Capitalize<T> =>
	`${value[0].toUpperCase()}${value.slice(1)}` as Capitalize<T>;
