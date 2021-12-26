import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={400}
    viewBox="0 0 800 400"
    backgroundColor="#060f1e"
    foregroundColor="#2f3134"
    {...props}
  >
    <rect x="9" y="29" rx="7" ry="7" width="1500" height="24" />
    <rect x="9" y="61" rx="7" ry="7" width="1500" height="24" />
    <rect x="8" y="97" rx="7" ry="7" width="1500" height="24" />
    <rect x="9" y="132" rx="7" ry="7" width="1500" height="24" />
    <rect x="6" y="264" rx="7" ry="7" width="1500" height="24" />
    <rect x="9" y="166" rx="7" ry="7" width="1500" height="24" />
    <rect x="7" y="232" rx="7" ry="7" width="1500" height="24" />
    <rect x="8" y="199" rx="7" ry="7" width="1500" height="24" />
    <rect x="7" y="295" rx="7" ry="7" width="1500" height="24" />
  </ContentLoader>
);

export default MyLoader;
