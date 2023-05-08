import { useRef, useEffect } from "react";
import * as echarts from "echarts";
const Bar = ({title,xData,yData,style}) => {
      //如何在react中获取dom->useRef
  //在什么地方获取dom节点->useEffect
  const domRef = useRef();
  const option = {
    title: {
      text: title,
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: xData,
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: yData,
      },
    ],
  };
  const echartsInit = () => {
    echarts.init(domRef.current).setOption(option);
  };

  useEffect(() => {
    echartsInit();
    //useEffect中使用了外部的函数 eslint发出警告 下行注释取消警告
     // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  );
};

export default Bar;
