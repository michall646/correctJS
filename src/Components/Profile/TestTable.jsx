const TestsTable = (props) => {

    let data = props.data.reverse();

    return (<table className="mdui-table">
        <caption>
          Your Runs
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Speed</th>
            <th scope="col">Typing Acc</th>
            <th scope="col">Ortho Acc</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {props.data.reverse().map(function(object, i){
            let date = new Date (object.startTime);
            let time = new Date (object.runTime).toISOString().slice(11, 19);
            
             return <tr key={i}>
                        <th scope="row">{date.toISOString().split('T')[0]}</th>
                        <td>{object.WPM}</td>
                        <td>{object.typing}</td>
                        <td>{object.ortho}</td>
                        <td>{time}</td>
                    </tr>
        })}
        </tbody>
      </table>)
}
export default TestsTable