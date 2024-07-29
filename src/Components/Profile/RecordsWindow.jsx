import "mdui/components/avatar.js";
import "mdui/components/card";
import Graph from "../Universal/graph";

const RecordsCard = (props) => {
  return (
    <mdui-card id="ResultsCard">
      <div className="TitleValuePair">
        <span className="ValueText">{props.BestSpeed}</span>{" "}
        <span className="TitleText">Best Speed</span>
      </div>
      <div className="TitleValuePair">
        <span className="ValueText">{props.BestTypingAccuracy}</span>{" "}
        <span className="TitleText">Best Typing Accuracy</span>
      </div>
      <div className="TitleValuePair">
        <span className="ValueText">{props.BestOrthoAccuracy}</span>{" "}
        <span className="TitleText">Best Orthographic Accuracy</span>
      </div>
      <div className="TitleValuePair">
        <span className="ValueText">{props.TotalRuns}</span>{" "}
        <span className="TitleText">Total Runs</span>
      </div>
      <div className="TitleValuePair">
        <span className="ValueText">{props.TotalTime}</span>{" "}
        <span className="TitleText">Total Time Spend</span>
      </div>



    </mdui-card>
  );
};
export default RecordsCard;
