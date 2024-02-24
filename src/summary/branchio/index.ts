import general from '../general';

export default async function branchio(url: URL, html: HTMLRewriter) {
  // https://github.com/misskey-dev/summaly/pull/13
  url.searchParams.append('$web_only', 'true');
  return await general(url, html);
}
