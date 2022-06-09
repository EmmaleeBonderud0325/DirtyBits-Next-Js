import DOMPurify from "dompurify";
import parse from "html-react-parser";

function useHtmlParser() {
  const parseHtml = (htmlString = "") => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };
  return parseHtml;
}

export default useHtmlParser;
