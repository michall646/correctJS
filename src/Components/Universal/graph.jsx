import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Graph = (props) => {
    //type
    //data[]
    //datasets[]
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
      return "#" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b));
    }
    const stringtohex = (string) =>
      {
        let split= string.split(", ");
        console.log(split);
        return rgbToHex(...split);
      }
    var style = getComputedStyle(document.body);

    
      return (
        <Line
          data={{
            labels: props.data.map((data) => data.label),
            datasets: [
              {
                label: "Typing Speed",
                data: props.data.map((data) => data.speed),
                backgroundColor: stringtohex(style.getPropertyValue('--mdui-color-primary')),
                borderColor: stringtohex(style.getPropertyValue('--mdui-color-primary')),
              },
              {
                label: "Typing Mistakes",
                data: props.data.map((data) => data.typingmistakes),
                backgroundColor: stringtohex(style.getPropertyValue('--mdui-color-error')),
                borderColor: stringtohex(style.getPropertyValue('--mdui-color-error')),
              },
            ]
          }}

          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Graph summary",
              },
            },
          }}
        />
      )
}
export default Graph