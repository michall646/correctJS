import { useState, useReducer, useEffect, useRef } from "react";
import "mdui/components/switch.js";
import "mdui/components/slider.js";
import "mdui/mdui.css";
import "mdui";
import "../Universal/App.css";
import Textwindow from "../Typing/textwindow";
import LetterButton from "./LetterButton";
import RefreshButton from "./Refreshbuttons";
import gettext from "../../Engine/textgenerator";
import GenerateOrgTokens from "../../Engine/engine";
import TimeCompletedCard from "../Home/timeCompletedCard";
import SimplifiedTimeCompleted from "./simplifiedTimeCounter";
import {reservedInLocalStorage} from "../../Engine/Values"

function TypingMode(props) {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState([" "]);
  const inputref = useRef(inputs);
  const [orgText, setOrgText] = useState(" Click refresh to start");
  const [TypingMistakesTable, setTypingMistakes] = useState([]);
  const [orthographyMistakesObject, setOrthographyMistakes] = useState({"wrong": 0, "count" : 0});
  const [timingTable, setTimingTable] = useState([]);
  const [StartTime, setStartTime] = useState(Date.now());
  const [endData, setEndData] = useState([{}])
  const [isShowingMistakes, setShowingMistakes] = useState(false);
  const lengthref = useRef(props.TextLength);

  const SetAppState = props.SetAppState;

  
  let AppState = props.AppState;
  let nextinputs = inputs;
  

  const detectKeyDown = (e) => {
    if (
      e.code !== "ControlLeft" &&
      e.code !== "AltLeft" &&
      e.code !== "ShiftLeft" &&
      e.code !== "AltRight" &&
      e.code !== "CapsLock"
    ) {
      if (e.code === "Space") {
        e.preventDefault();
      }

      let temp = inputref.current;
      if (e.code === "Backspace") {
        temp.pop();
      } else {
        temp.push(e.key);
      }
      setInputs([...temp]);

    }
  };
  const handleSliderChange = (e) =>{
    let value =  document.getElementById("textlengthslider").value;
    props.SetTextLength(value);
    lengthref.current = value;
  }


  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
    document.getElementById("textlengthslider").addEventListener('change', handleSliderChange,true)
  }, []);
  
  useEffect(() => {
    if(props.AppState === "EndedTyping"){
      console.log(endData);
      localStorage.setItem(localStorage.length - reservedInLocalStorage,JSON.stringify(endData));
    }
  }, [AppState]);

  

  const refresh = () => {
    nextinputs = "";
    console.log(lengthref)
    setOrgText(gettext(lengthref.current));
    setInputs([" "]);
    inputref.current = [" "];
    setTypingMistakes([]);
    setTimingTable([]);
    setStartTime(Date.now());
    SetAppState("Typing");
  };

  return (
    <>
      <h1>Typing Test</h1>
      <RefreshButton refresh={refresh}></RefreshButton>
      <SimplifiedTimeCompleted></SimplifiedTimeCompleted>
      <mdui-slider min="20" max="300" step="20" id="textlengthslider" value="15"></mdui-slider>
      <Textwindow
        method={setInputs}
        inputs={nextinputs}
        key={inputs.length}
        org={orgText}
        TypingMistakesTable={TypingMistakesTable}
        setTypingMistakes={setTypingMistakes}
        orthographyMistakesObject={orthographyMistakesObject}
        setOrthographyMistakes={setOrthographyMistakes}
        timingTable={timingTable}
        setTimingTable={setTimingTable}
        StartTime={StartTime}
        AppState={AppState}
        SetAppState={SetAppState}
        setEndData={setEndData}
        endData={endData}
        isShowingMistakes={isShowingMistakes}
        setShowingMistakes={setShowingMistakes}
        lengthref={props.TextLength}

      />
    </>
  );
}

export default TypingMode;
