import { z, ZodTypeAny } from "zod";

/**
 * Stolen from T6 in the TypeScript Community Discord.
 * @see https://discord.com/channels/508357248330760243/508357248330760249/1011909142014873660
 */
type Narrow<T> =
	| (T extends infer U ? U : never)
	| Extract<T, number | string | boolean | bigint | symbol | null | undefined | []>
	| ([T] extends [[]] ? [] : { [K in keyof T]: Narrow<T[K]> });

type WithValidationCallback<T extends Array<ZodTypeAny>, R> = (
	...args: { [K in keyof T]: z.infer<T[K]> }
) => R;

type AnyWithValidationCallback = WithValidationCallback<Array<ZodTypeAny>, unknown>;

export function withValidation<
	SchemaTuple extends Array<ZodTypeAny>,
	CallbackFunction extends WithValidationCallback<SchemaTuple, ReturnValue>,
	ReturnValue
>(schemas: Narrow<SchemaTuple>, callback: CallbackFunction): CallbackFunction;
export function withValidation(
	schemas: Array<ZodTypeAny>,
	callback: AnyWithValidationCallback
): AnyWithValidationCallback {
	return (...args) => {
		const parameters = schemas.map((schema, index) => schema.parse(args[index]));
		return callback(...parameters);
	};
}
