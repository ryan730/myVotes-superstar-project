import React from 'react';
import { Card } from '@alifd/next';
import { Chart, Geom, Coord, Axis, Legend, Guide, Label } from 'bizcharts';
const { Text } = Guide;
// import styles from './index.module.scss';
const styles = {};
const DEFAULT_DATA = {
  title: '占比',
  value: 183112,
  chartData: [
    {
      type: 'chrome',
      value: 40,
      title: 'chrome | 40.00%',
    },
    {
      type: 'IE',
      value: 21,
      title: 'IE | 22.12%',
    },
    {
      type: 'FireFox',
      value: 17,
      title: 'FireFox | 16.59%',
    },
    {
      type: 'safari',
      value: 13,
      title: 'safari | 13.11%',
    },
    {
      type: 'Opera',
      value: 9,
      title: 'Opera |  9.29%',
    },
  ],
  chartHeight: 200,
};

const FusionCardLineChart = props => {
  const { cardConfig } = props;
  const { chartData } = cardConfig;
  console.log('opopopopopop=====>>>', chartData)
  return (
    <Card free>
      <Card.Header title={<span className={styles.title}>饼图百分比</span>} />
      <Card.Divider />
      <Card.Content>
        <Chart width={10} height={400} forceFit data={chartData} padding={['auto', 'auto']}>
          <Coord type="theta" radius={0.6} innerRadius={0.5} />
          <Axis name="percent" />
          <Legend
            position="right-center"
            textStyle={{
              fill: '#666',
              fontSize: 14,
            }}
            itemMarginBottom={24}
          />
          <Geom
            type="intervalStack"
            position="value"
            color="title"
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label content="type" offset={40} />
          </Geom>
          {/* <Guide>
            <Text
              position={["50%", "50%"]}
              content="24 hours"
              style={{
                lineHeight: "240px",
                fontSize: "48",
                fill: "#609064",
                textAlign: "center"
              }}
            />
          </Guide> */}
        </Chart>
      </Card.Content>
    </Card>
  );
};

export default FusionCardLineChart;
