import { Modal } from 'react-bootstrap';
import echarts from 'echarts'
import Chart from '@guoliim/react-echarts'
import styled from '@emotion/styled'

const BarChart = styled(Chart)`
  block-size: 400px;
`

const ScoreChart = ({ visibility, onClose, userData }) => {

  const handlerTest = ({ value, name }) => {
    alert(value == 1 ? `${value} person gets ${name}` : `${value} people get ${name}`)
  }

  const chartOption = () => {
    const chartData = {};
    userData.forEach(element => {
      if(chartData[element.score]) chartData[element.score]++;
      else chartData[element.score] = 1;
    });
    return {
      option: {
        xAxis: {
          type: 'category',
          data: Object.keys(chartData)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Object.values(chartData),
          type: 'bar',
          color: '#5858ff'
        }]
      },
      on: [
        {
          event: 'click',
          handler: handlerTest,
        },
      ],
    }
  }

  return <Modal show={visibility} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Score Chart</Modal.Title>
    </Modal.Header>
    <Modal.Body className="pt-0">
      <BarChart
        echarts={echarts}
        data={chartOption()}
      />
    </Modal.Body>
  </Modal>
}

export default ScoreChart;