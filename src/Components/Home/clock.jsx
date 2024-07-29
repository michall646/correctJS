import { useEffect, useState } from "react"

const ClockComponent = (props) =>
{
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
          }, 1000);
          return () => clearInterval(timer);
    }, [])
    // Hours part from the timestamp
    let hours = date.getHours();
        // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    return(
    <p id="clockElement">{hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)}</p>
)
}
export default ClockComponent