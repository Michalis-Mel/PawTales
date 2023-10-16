import fb from "../assets/icons/facebook.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/linkedin.png";
import viber from "../assets/icons/viber.png";
import messenger from "../assets/icons/messenger.png";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  ViberShareButton,
  LinkedinShareButton,
  FacebookMessengerShareButton,
} from "react-share";

const ShareStory = ({ story }) => {
  const location = useLocation();

  return (
    <div className="shareBtns">
      <FacebookShareButton
        className="shareBtn"
        target="_blank"
        url={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
        hashtag={"#PawTales"}
        quote={story.smallDescription}
      >
        <img src={fb} alt="Facebook" />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        className="shareBtn"
        appId="1366083764342178"
        url={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
        redirectUri={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
        to=""
        target="_blank"
      >
        <img src={messenger} alt="Facebook" />
      </FacebookMessengerShareButton>
      <ViberShareButton
        className="shareBtn"
        target="_blank"
        title={story.title}
        url={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
      >
        <img src={viber} alt="Facebook" />
      </ViberShareButton>
      <TwitterShareButton
        className="shareBtn"
        target="_blank"
        title={story.title}
        hashtag={"#PawTales"}
        url={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
      >
        <img src={twitter} alt="Facebook" />
      </TwitterShareButton>
      <LinkedinShareButton
        className="shareBtn"
        title={story.title}
        summary={story.smallDescription}
        source="PawTales"
        url={`https://michalis-mel.github.io/PawTales/#${location.pathname}`}
        target="_blank"
      >
        <img src={linkedin} alt="Facebook" />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareStory;
