import 'mdui/components/card'
import 'mdui/components/slider'
import 'mdui/components/button'
import 'mdui/components/tooltip.js';
import LastTestCard from './lastTestCard';
import ClockComponent from './clock';
import TimeCompletedCard from './timeCompletedCard';
import { useEffect } from 'react';
import StreakCard from './streakCard';

const HomeMode = (props) =>
    {
            useEffect(()=>{
                document.getElementById("startButton").addEventListener("click",()=> props.SetAppState("Typing"), true);
            },[])
            let date = new Date(Date.now());
            // Hours part from the timestamp
            let hours = date.getHours();
                // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
                // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            let userName = JSON.parse(localStorage["UserData"]).name;
            return (
                <>
                {(new Date().hours > 12) ? <h2>Good Afternoon, {userName}</h2> : <h2>Good Morning, {userName}</h2>}
                <div id='homecontainer'>
                    
                    <mdui-card id="clockCard"  variant="outlined">
                        <ClockComponent></ClockComponent>
                    </mdui-card>

                    <mdui-card id="sliderCard">
                        <mdui-tooltip content="Choose aproximate length of text"><h3 id="TextLenghtName">Text length</h3></mdui-tooltip>
                        
                        <mdui-slider min="5" max="50" step="5"  id="Slider"></mdui-slider>
                        <mdui-button id="startButton" end-icon="play_arrow">Start</mdui-button>
                    </mdui-card>
                    <TimeCompletedCard></TimeCompletedCard>
                    <StreakCard></StreakCard>
                    <LastTestCard></LastTestCard>
                    
                    
                    
                </div>
                </>
            )
    }
export default HomeMode