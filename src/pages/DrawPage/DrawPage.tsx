import "./drawPage.css";
import Canvas from "../../components/canvas/Canvas";
import { constans } from "../../constans/constans";
import PublicPictures from "../../components/publicPictures/PublicPictures";
import ThemeSwitcher from "../../components/themeSwitcher/ThemeSwitcher";

const DrawPage = () => {
  return (
    <div className="draw">
      <Canvas />
      <div className="side-gallery">
        <h2>{constans.hallOfFame}</h2>
        <PublicPictures />
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default DrawPage;
