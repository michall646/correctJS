import { useState, useMemo, useEffect } from "react";
import EngineHandleWriting from "../../Engine/engine";
import Text from "./text";
import "mdui/components/card.js";
import Graph from "../Universal/graph";
import { elements } from "chart.js";

function Textwindow(props) {
  const [tempState, setTempState] = useState("Typing");
  const calculateTypingAccuracy = (table) => {
    let correct = 0,
      wrong = 0;
    for (let element in table) {
      if (table[element]) {
        wrong++;
      } else {
        correct++;
      }
    }
    return Math.round((correct / (correct + wrong)) * 100);
  };
  const calculateOrthoAccuracy = (object) => {
    if(object.count === 0) return 100;
    return ((object.count - object.wrong) / object.count) * 100;
  };
  const mapTimingTable = (TimingTable) => {
    let table = TimingTable.slice();
    table.push(props.endData.runTime - props.StartTime);
    let mappedTimeTable = table.map((x) => x - props.StartTime);
    return mappedTimeTable;
  };
  const calculateSecondsArray = (timevalues) => {
    let secondsArray = [];
    let second = 0;
    let counter = 0;

    for (let element = 0; element < timevalues.length; element++) {
      let timevalue = Math.floor(timevalues[element] / 1000); // we get second
      if (timevalue === second) {
        counter++;
      } else {
        secondsArray.push(counter);
        counter = 1;
        let dif = timevalue - second;

        for (let i = 1; i < dif; i++) {
          secondsArray.push(0);
        }
        second = timevalue;
      }
    }
    return secondsArray;
  };
  const CalculateWPMfromCPS = (Cps) => {
    return Cps * 12;
  };
  const CalculateGraphData = (typingmistakes, timevalues) => {
    let secondsArray = calculateSecondsArray(timevalues);
    let data = [];
    let inputsCompleted = 0;
    let TypingMistakesPerSecond;

    for (let element in secondsArray) {
      inputsCompleted += secondsArray[element];
      let SlicedTypingMistakes = typingmistakes.slice(
        inputsCompleted,
        inputsCompleted + secondsArray[element]
      );

      if (SlicedTypingMistakes.length > 0) {
        TypingMistakesPerSecond = SlicedTypingMistakes.reduce(
          (accumulator, current) => accumulator + current
        );
      } else {
        TypingMistakesPerSecond = 0;
      }

      data.push({
        label: element,
        speed: CalculateWPMfromCPS(secondsArray[element]),
        typingmistakes: TypingMistakesPerSecond * 10,
      });
    }

    return data;
  };
  const calculateAverageWPM = (mappedTimingTable) => {
    let secondsCount = calculateSecondsArray(mappedTimingTable).length;
    let cps = mappedTimingTable.length / secondsCount;
    return CalculateWPMfromCPS(cps);
  };


  useEffect(() => {
    if (props.tempState === "EndedTyping") {
    }
    props.setEndData({
      WPM: wpm,
      typing: TypingAccuracy,
      ortho: OrthographyAccuracy,
      startTime: props.StartTime,
      runTime: Date.now() - props.StartTime,
      length: props.lengthref,
    });
    props.SetAppState(tempState);
  }, [tempState]);
  useEffect(()=>{
     let orhobutton =document.getElementById('showOrhoButton');
     if(typeof orhobutton !== "undefined" && orhobutton !== null){
      orhobutton.addEventListener("click",event => props.setShowingMistakes(true))
     }
     let resultsButton =document.getElementById('showResultsButton');
     if(typeof resultsButton !== "undefined" && resultsButton !== null){
      resultsButton.addEventListener("click",event => props.setShowingMistakes(false))
     }
  })

  let AppState = props.AppState;
  let TypingMistakesTable = props.TypingMistakesTable;

  let TypingAccuracy = calculateTypingAccuracy(TypingMistakesTable);
  let OrthographyAccuracy = calculateOrthoAccuracy(
    props.orthographyMistakesObject
  );
  let mappedTimingTable = mapTimingTable(props.timingTable);
  let wpm = calculateAverageWPM(mappedTimingTable);
  wpm = Math.round(wpm);
  let calculatedData = CalculateGraphData(
    TypingMistakesTable,
    mappedTimingTable
  );
  if (AppState === "Typing" ) {
    return (
      <>
        <mdui-card variant="elevated" id="textwindow">
          <Text
            inputs={props.inputs}
            key={props.inputs.lenght + 1}
            orgtxt={props.org}
            TypingMistakesTable={props.TypingMistakesTable}
            setTypingMistakes={props.setTypingMistakes}
            orthographyMistakesObject={props.orthographyMistakesObject}
            setOrthographyMistakes={props.setOrthographyMistakes}
            AppState={props.AppState}
            SetAppState={props.SetAppState}
            timingTable={props.timingTable}
            setTimingTable={props.setTimingTable}
            setTempState={setTempState}
          />
        </mdui-card>
      </>
    );
  } else if(AppState === "EndedTyping"){
    if(props.isShowingMistakes === false){
    return (
      <>
        <mdui-button id="showOrhoButton" icon="manage_search">show orthographic mistakes</mdui-button>
        <mdui-card variant="elevated" id="textwindow">
          <div id="GraphContainer">
            <Graph data={calculatedData}></Graph>
          </div>
          

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
  else{
    return(
    <>
        <mdui-button id="showResultsButton"  icon="query_stats">Show test summary</mdui-button>
        <mdui-card variant="elevated" id="textwindow">
          
          <Text
            inputs={props.inputs}
            key={props.inputs.lenght + 1}
            orgtxt={props.org}
            TypingMistakesTable={props.TypingMistakesTable}
            setTypingMistakes={props.setTypingMistakes}
            orthographyMistakesObject={props.orthographyMistakesObject}
            setOrthographyMistakes={props.setOrthographyMistakes}
            AppState={props.AppState}
            SetAppState={props.SetAppState}
            timingTable={props.timingTable}
            setTimingTable={props.setTimingTable}
            setTempState={setTempState}
            isShowingMistakes={props.isShowingMistakes}
          />
        </mdui-card>
      </>
    )
  }
  }
 
}

export default Textwindow;
