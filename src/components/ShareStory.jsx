import fb from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/linkedin.png";
import viber from "../assets/icons/viber.png";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  ViberShareButton,
  LinkedinShareButton,
} from "react-share";

const ShareStory = ({ story }) => {
  const location = useLocation();

  return (
    <div className="shareBtns">
      <FacebookShareButton
        className="shareBtn"
        target="_blank"
        url={`https://www.pawtales.gr/#${location.pathname}`}
        hashtag={"#PawTales"}
        quote={story.smallDescription}
      >
        <img src={fb} alt="Facebook" />
      </FacebookShareButton>
      <ViberShareButton
        className="shareBtn"
        target="_blank"
        title={story.title}
        url={`https://www.pawtales.gr/#${location.pathname}`}
      >
        <img src={viber} alt="Facebook" />
      </ViberShareButton>
      <TwitterShareButton
        className="shareBtn"
        target="_blank"
        title={story.title}
        hashtag={"#PawTales"}
        url={`https://www.pawtales.gr/#${location.pathname}`}
      >
        <img src={twitter} alt="Facebook" />
      </TwitterShareButton>
      <LinkedinShareButton
        className="shareBtn"
        title={story.title}
        summary={story.smallDescription}
        source="PawTales"
        url={`https://www.pawtales.gr/#${location.pathname}`}
        target="_blank"
      >
        <img src={linkedin} alt="Facebook" />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareStory;
