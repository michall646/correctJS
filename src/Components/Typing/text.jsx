import { useState, useMemo, useEffect } from "react";
import comparetext from "../../Engine/engine";
import gettext from "../../Engine/textgenerator";
import GenerateOrgTokens from "../../Engine/textgenerator";

function Text(props) {

  let elements = []; 

  let inputs = props.inputs;
  let TypingMistakesTable = props.TypingMistakesTable;
  const setTypingMistakes = props.setTypingMistakes;
  let orthographyMistakesObject = props.orthographyMistakesObject;
  let timingTable = props.timingTable;
  const setTimingTable = props.setTimingTable;

  let orgTokens = comparetext.GenerateOrgTokens(props.orgtxt);
  let states;
  if(props.isShowingMistakes === true ){states = comparetext.generateStates(inputs, orgTokens, true)}
  else {states = comparetext.generateStates(inputs, orgTokens, false)}
  
  let countsElement = states.pop();
  let wrongUnknownsCount = countsElement.wrongCount;
  let unknownCount = countsElement.unknownCount;
  //props.setOrthographyMistakes({"wrong": wrongUnknownsCount,"count": unknownCount})

  let blocks = comparetext.createBlocks(states, inputs, orgTokens);

  for (let element = 0; element < blocks.length - 1; element++) {
    if (blocks[element].state === "unknown") {
      elements.push(
        <span className="unknown" key={element}>
          [ {blocks[element].value} | {blocks[element].alt} ]
        </span>
      );
    } else {
      elements.push(
        <span className={blocks[element].state} key={element}>
          {blocks[element].value}
        </span>
      );
    }
  }
  let hasAlreadySetTimeValue = false;
  for (let element in states) {
    
    if (states[element] !== "untyped" && states[element] !== "unknown") {
      //detecting  mistakes
      if (states[element] === "wrong") {
        TypingMistakesTable[element] = true;
      } else if (
        states[element] !== "untyped" &&
        !TypingMistakesTable[element] === true
      ) {
        TypingMistakesTable[element] = false;
      } else {
      }
      if(typeof timingTable[element] ==="undefined" && !hasAlreadySetTimeValue){
        timingTable[element] = Date.now();
        hasAlreadySetTimeValue = true;
      }
    }
    
  }
  if (TypingMistakesTable !== props.TypingMistakesTable) {
    setTypingMistakes([...mistakeTable]);
  }
  if(timingTable !== props.timingTable){
    setTimingTable([...timingTable]);
  }

  if (blocks[blocks.length - 1] === true) {
   props.setTempState("EndedTyping")
 }
 if(wrongUnknownsCount !== orthographyMistakesObject.wrong || unknownCount !== orthographyMistakesObject.count){
  props.setOrthographyMistakes({"wrong": wrongUnknownsCount,"count": unknownCount});
 }

  return elements;
}
export default Text;
