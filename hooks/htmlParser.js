import DOMPurify from "dompurify";
import parse from "html-react-parser";

function useHtmlParser(htmlString = "") {
  console.log("htmlString", htmlString);
  const cleanHtmlString = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  const html = parse(cleanHtmlString);
  return html;
}

export default useHtmlParser;
