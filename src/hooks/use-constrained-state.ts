import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useConstrainedState<T>(
	initialValue: T | (() => T),
	constrainerFn: (value: T) => T
): [T, Dispatch<SetStateAction<T>>] {
	// eslint-disable-next-line react/hook-use-state
	const [value, setRawValue] = useState<T>(initialValue);

	const setValue = useCallback<Dispatch<SetStateAction<T>>>(
		(value) => {
			setRawValue((prevValue) =>
				constrainerFn(
					typeof value === "function" ? (value as (prevState: T) => T)(prevValue) : value
				)
			);
		},
		[constrainerFn]
	);

	return [value, setValue];
}
