import { reservedInLocalStorage } from "../../Engine/Values";

const StreakCard = (props) => {
  const getLocalData = () => {
    let array = [];
    for (let i = 0; i < localStorage.length - reservedInLocalStorage; i++) {
      let element = localStorage.getItem(i);
      array.push(JSON.parse(element));
    }
    return array;
  };
  function convertTimestampsToStreak(timestamps) {
    // Get today's date at midnight (0 hours)
    const today = new Date();

    // Convert timestamps to Date objects
    const dates = timestamps.map((timestamp) => new Date(timestamp));
    console.log(dates);

    // Initialize variables
    let streak = 0;
    let bestStreak = 0;
    let previousDay = null;

    // Loop through dates in reverse order
    for (let i = 0; i < dates.length; i++) {
      const currentDay = dates[i];
      // Check if dates are consecutive days
      if (previousDay !== null && isConsecutiveDay(previousDay, currentDay)) {
        streak = Math.max(1, streak);
        streak++;
        console.log(previousDay, currentDay, streak);
      } else if (previousDay !== null && !isSameDay(previousDay, currentDay)) {
        streak = 0; // Reset streak if not consecutive
      }
      if (streak > bestStreak) {
        bestStreak = streak;
      }
      previousDay = currentDay;
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if the streak includes today

    return { streak: streak, bestStreak: bestStreak };
  }

  function isConsecutiveDay(date1, date2) {
    // Check if the difference in days is 1
    let epochDays1 = Math.floor(date1.getTime() / 86400000);
    let epochDays2 = Math.floor(date2.getTime() / 86400000);
    return epochDays2 - epochDays1 === 1;
  }
  function isSameDay(date1, date2) {
    let epochDays1 = Math.floor(date1.getTime() / 86400000);
    let epochDays2 = Math.floor(date2.getTime() / 86400000);
    return epochDays2 === epochDays1;
  }
  let data = getLocalData();
  data = data.map((x) => (x = x.startTime));
  let streak = convertTimestampsToStreak(data);

  return (
    <mdui-card id="timerCard">
      <div className="TitleValuePair">
        <span className="ValueText">{streak.streak}</span>{" "}
        <span className="TitleText">Your Current Streak</span>
      </div>
      <div className="TitleValuePair">
        <span className="ValueText">{streak.bestStreak}</span>{" "}
        <span className="TitleText">Your Best Streak</span>
      </div>
    </mdui-card>
  );
};
export default StreakCard;
