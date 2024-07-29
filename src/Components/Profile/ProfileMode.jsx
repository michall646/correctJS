import Graph from "../Universal/graph"
import Avatar from "./Avatar"
import BioCard from "./BioCard"
import RecordsCard from "./RecordsWindow"
import RecordsGraph from "./recordsGraph"
import {reservedInLocalStorage} from "../../Engine/Values"
import stringtohex from "../../Engine/engine"
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import TestsTable from "./TestTable"
const ProfileMode = (props) => {
    const loadLocalStorageToArray = () =>{
        let array = [];
        for(let i = 0; i < localStorage.length - reservedInLocalStorage; i++){
            let element = localStorage.getItem(i);
            array.push(JSON.parse(element));
        }
        return (array);
    }
    const GetRecords = (data) =>{
        let WPMs = data.map(
            (x) => typeof x.WPM !== "undefined" ?x.WPM: 0
        );
        
        let BestSpeed = Math.max(...WPMs);

        let TypingAcs = data.map(
            (x) => typeof x.typing !== "undefined"  && x.typing !== null?x.typing: 0
        );
        
        let BestTypingAccuracy = Math.max(...TypingAcs);
        
        let OrthoAcs = data.map(
            (x) => typeof x.ortho !== "undefined"  && x.ortho !== null?x.ortho: 0
        );
        
        let BestOrthoAccuracy = Math.max(...OrthoAcs);

        let TotalRuns = data.length;
        let TotalTime = 0;
        if(data.length > 0){
            TotalTime = data.reduce(
            (Acc, x) =>typeof x.runTime!== "undefined"? Acc += x.runTime : Acc += 0, 0
        )}
        TotalTime = new Date(TotalTime).toISOString().slice(11, 19);

        return {"BestSpeed": BestSpeed, "BestTypingAccuracy": BestTypingAccuracy, "BestOrthoAccuracy": BestOrthoAccuracy, "TotalRuns": TotalRuns, "TotalTime": TotalTime}
    }
    const calculateGraphData = (data) => {
        let graphData = [];
        for(let element in data){
            graphData.push({
                label: element,
                speed: data[element].WPM,
                typingmistakes: data[element].typing,
                orthoaccuracy: data[element].ortho,
                length: data[element].length
              })
        }
        return graphData;

    }
    const calculateHeatData = (local) =>{
        let heatdata = [];
        for(let element in local){
            let currentDate = new Date(local[element].startTime).toISOString().split('T')[0];
            let dates = heatdata.map((x)=> x = x.date);
            let index = dates.indexOf(currentDate);
            if(index === -1 )
                { heatdata.push({"date": currentDate, "count": 1}) }
            else{
                heatdata[index] = {"date": currentDate, "count": heatdata[index].count + 1}
            }
          
        }
        return heatdata
    }
 
    var style = getComputedStyle(document.body);

    let LocalData = loadLocalStorageToArray();
    let RecordsObject = GetRecords(LocalData);
    let graphdata = calculateGraphData(LocalData);
    let heatData = calculateHeatData(LocalData);
    let color = stringtohex.stringtohex(style.getPropertyValue('--mdui-color-primary'));
    return (
        <div id="profileModeContainer">
        <BioCard userName={"Felix Misiak"} userBio={"Mały słodki, brązowy misio"}/>
        <RecordsCard
        BestSpeed={RecordsObject.BestSpeed}
        BestTypingAccuracy={RecordsObject.BestTypingAccuracy}
        BestOrthoAccuracy={RecordsObject.BestOrthoAccuracy}
        TotalRuns={RecordsObject.TotalRuns}
        TotalTime={RecordsObject.TotalTime}
        >
        </RecordsCard>
        
        <div id="GraphContainer" style = {{width: "500px",height: "300px"}}>
            <RecordsGraph data={graphdata}></RecordsGraph>
            </div>
        <div id="heatmapContainer">
            <HeatMap
                value={heatData}
                style={{ color: color, '--rhm-rect-active': 'white' }}
                weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
                panelColors={{
                    0: stringtohex.LightenDarkenColor(color.toUpperCase(), 80),
                    2: stringtohex.LightenDarkenColor(color.toUpperCase(), 20),
                    4: stringtohex.LightenDarkenColor(color.toUpperCase(), 0),
                    10: stringtohex.LightenDarkenColor(color.toUpperCase(), 15),
                    20: stringtohex.LightenDarkenColor(color.toUpperCase(), -40),
                    30: stringtohex.LightenDarkenColor(color.toUpperCase(), -60),}}
                startDate={new Date('2024/05/01')}
                width={400}
                legendCellSize= {0}
                rectProps={{
                    rx: 3
                  }}
            />
        </div>
        <div>
            <TestsTable data={LocalData}></TestsTable>
        </div>
        </div>
    )
}
export default ProfileMode