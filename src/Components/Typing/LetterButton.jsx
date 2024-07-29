import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/checkbox/checkbox.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/filled-icon-button";
import "@material/web/iconbutton/outlined-icon-button";

function LetterButton() {
  return (
    <>
      <div className="buttongraphdiv">
        <md-outlined-button className="letterbutton">
          Outlined
        </md-outlined-button>
        <div className="graphcontainer">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default LetterButton;
