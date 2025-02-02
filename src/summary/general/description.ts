import clip from "@misskey-dev/summaly/built/utils/clip";
import { assign } from "../common";
import type { PrioritizedReference } from "../common";

export default function getDescription(url: URL, html: HTMLRewriter) {
  const result: PrioritizedReference<string | null> = {
    bits: 2, // 0-3
    priority: 0,
    content: null,
  };
  html.on('meta[property="og:description"]', {
    element(element) {
      const content = element.getAttribute("content");
      if (content) {
        assign(result, 3, content);
      }
    },
  });
  html.on('meta[name="twitter:description"]', {
    element(element) {
      const content = element.getAttribute("content");
      if (content) {
        assign(result, 2, content);
      }
    },
  });
  html.on('meta[name="description"]', {
    element(element) {
      const content = element.getAttribute("content");
      if (content) {
        assign(result, 1, content);
      }
    },
  });
  return new Promise<string | null>((resolve) => {
    html.onDocument({
      end() {
        resolve(result.content && clip(result.content, 300));
      },
    });
  });
}
