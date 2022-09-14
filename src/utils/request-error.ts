import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ZodError } from "zod";

export interface RequestErrorOptions {
	statusCode?: number;
	details?: Record<string, unknown>;
}

export class RequestError extends Error {
	public static from(reason: unknown): RequestError {
		if (!(reason instanceof Error))
			return new RequestError("Unknown error", { details: { reason } });

		if (reason instanceof RequestError) return reason;

		if (reason instanceof ZodError) {
			return new RequestError("Validation issue", {
				statusCode: 400,
				details: {
					issues: reason.issues.map((issue) => ({
						message: issue.message,
						path: issue.path
					}))
				}
			});
		}

		if (reason instanceof PrismaClientKnownRequestError) {
			return new RequestError(reason.message.split("\n\n\n")[1].trim() || "Database error", {
				statusCode: reason.code === "P2002" ? 400 : 500
			});
		}

		return new RequestError(reason.message);
	}

	public statusCode: number = 500;

	public constructor(message: string, private options: RequestErrorOptions = {}) {
		super(message);

		if (options.statusCode) this.statusCode = options.statusCode;
	}

	public isInternal() {
		return this.statusCode >= 500;
	}

	public isClient() {
		return this.statusCode >= 400 && !this.isInternal();
	}

	public toJSON() {
		return {
			message: this.message,
			...this.options.details
		};
	}
}
