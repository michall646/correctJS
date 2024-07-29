import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import engine from "../../Engine/engine"

const RecordsGraph = (props) => {
    //type
    //data[]
    //datasets[]
    var style = getComputedStyle(document.body);
    
    
      return (
        <Line
          data={{
            labels: props.data.map((data) => data.label),
            datasets: [
              {
                label: "Typing Speed",
                data: props.data.map((data) => data.speed),
                backgroundColor: engine.stringtohex(style.getPropertyValue('--mdui-color-primary')),
                borderColor: engine.stringtohex(style.getPropertyValue('--mdui-color-primary')),
              },
              {
                label: "Typing Accuracy",
                data: props.data.map((data) => data.typingmistakes),
                backgroundColor: engine.stringtohex(style.getPropertyValue('--mdui-color-error')),
                borderColor: engine.stringtohex(style.getPropertyValue('--mdui-color-error')),
              },
              {
                label: "Orhographic Accuracy",
                data: props.data.map((data) => data.orthoaccuracy),
                backgroundColor: engine.stringtohex(style.getPropertyValue('--mdui-color-tertiary')),
                borderColor: engine.stringtohex(style.getPropertyValue('--mdui-color-tertiary')),
              },
              {
                label: "Text length",
                data: props.data.map((data) => data.length),
                backgroundColor: engine.stringtohex(style.getPropertyValue('--mdui-color-secondary')),
                borderColor: engine.stringtohex(style.getPropertyValue('--mdui-color-secondary')),
              },
            ]
          }}

          options={{
            elements: {
              line: {
                tension: 0.6,
              },
            },
            plugins: {
              title: {
                text: "Test summary",
              },
            },
          }}
        />
      )
}
export default RecordsGraph