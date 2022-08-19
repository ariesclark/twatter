import useSWR from "swr";

import type { LinkPreview } from "../pages/api/link-preview";

export function useLinkPreview(url: string) {
	return useSWR<LinkPreview>(["link-preview", url], async () => {
		const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
		return response.json();
	});
}
