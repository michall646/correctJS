import 'mdui/components/card'
import 'mdui/components/linear-progress.js';
import {reservedInLocalStorage} from "../../Engine/Values"
const TimeCompletedCard = (props) => {
    const getTimeToday =()=>{
        const today =Math.floor(new Date() / 86400000);
        let filteredindexes = [];
        let totaltime = 0;

        for(let i = 0; i < localStorage.length - reservedInLocalStorage; i++){
            let element = JSON.parse(localStorage[i]).startTime;
            element = Math.floor(element / 86400000);
            if (element === today) {
                filteredindexes.push(i);
            }

        }
        for(let i in filteredindexes){
            totaltime += JSON.parse(localStorage[filteredindexes[i]]).runTime;
        }
        return totaltime;
    }

    let unixTimeToday = getTimeToday();
    let unixGoalTime = JSON.parse(localStorage["UserData"]).time * 60000// change to props
    let minutesToday = Math.floor(unixTimeToday / 60000);
    let minutesGoal = Math.floor(unixGoalTime / 60000);
    return(
        <mdui-card id="timerCard">
            <p>Today</p>
            <h2>{minutesToday} / {minutesGoal} min</h2>
            <mdui-linear-progress value={minutesToday} max={minutesGoal}></mdui-linear-progress>
        </mdui-card>
    )

}
export default TimeCompletedCard 