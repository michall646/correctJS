import {reservedInLocalStorage} from "../../Engine/Values"

const LastTestCard =(props) =>
    {

  let length = localStorage.length-  reservedInLocalStorage;
  let lastEntry = {WPM: 0, typing: 0, ortho:0};
  if(length > 0){
    lastEntry = JSON.parse(localStorage[length - 1]);
  }
  


  let TypingAccuracy = lastEntry.typing;
  let OrthographyAccuracy = lastEntry.ortho;
  let wpm = lastEntry.WPM;

  return (
    <>
      <mdui-card variant="elevated" id="lastTestCard">

        <h3>Your last test</h3>
        <div className="TitleValuePair">
            <span className="ValueText">{wpm}</span>{" "}
            <span className="TitleText">wpm</span>
          </div>
          <div className="TitleValuePair">
            <span className="ValueText">{TypingAccuracy}</span>{" "}
            <span className="TitleText">Typing accuracy</span>
          </div>
          <div className="TitleValuePair">
            <span className="ValueText">{OrthographyAccuracy}</span>{" "}
            <span className="TitleText">Orthography accuracy</span>
          </div>
      </mdui-card>
    </>
  );
    }
    export default LastTestCard