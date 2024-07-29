import 'mdui/components/button'
import {reservedInLocalStorage} from "../../Engine/Values"

const SimplifiedTimeCompleted = () =>
    {
        const getTimeToday =()=>{
            const today =Math.floor(new Date() / 86400000)
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
        let unixGoalTime = JSON.parse(localStorage["UserData"]).time * 60000;// change to props
        let minutesToday = Math.floor(unixTimeToday / 60000);
        let minutesGoal = Math.floor(unixGoalTime / 60000);
        return(
            <>
            <mdui-button variant="outlined">{minutesToday} / {minutesGoal}</mdui-button>

            </>
        )
    }
    export default SimplifiedTimeCompleted