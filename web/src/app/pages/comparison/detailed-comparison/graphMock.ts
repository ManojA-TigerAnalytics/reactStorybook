import { ReactEChartsProps } from '../../../components/common/React-ECharts'

export const overviewGraphData: ReactEChartsProps['option'] = {
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    icon: 'circle',
  },
  xAxis: {
    type: 'category',
    data: ['2696', '2701'],
  },
  yAxis: {
    type: 'value',
    axisTick: {
      length: 6,
      lineStyle: {
        type: 'dashed',
        color: '#EDEDED',
      },
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  color: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter(params: string | any[]) {
      let tooltip = `<span style="font-size:10px">${params[0].name}</span><table>`
      for (let i = 0; i < params.length; i += 1) {
        const param = params.at(i)
        tooltip += `<tr style="color:${param.color}" ><td>${param.seriesName}</td><td>:</td><td>${param.value}</td></tr>`
      }
      tooltip += '</table>'
      return tooltip
    },
  },
  series: [
    {
      name: 'Average Check Value',
      type: 'bar',
      data: [35, 47],
      label: {
        show: true,
        position: 'inside',
      },
    },
    {
      name: 'Effect On Margin',
      type: 'bar',
      label: {
        show: true,
        position: 'inside',
      },
      data: [-23, -17],
    },
    {
      name: 'Gross Profit',
      type: 'bar',
      label: {
        show: true,
        position: 'inside',
      },
      data: [6, 13],
    },
    {
      name: 'Guest Count',
      type: 'bar',
      label: {
        show: true,
        position: 'inside',
      },
      data: [6, 5],
    },
    {
      name: 'Net Sales',
      type: 'bar',
      data: [43, 55],
      label: {
        show: true,
        position: 'inside',
      },
    },
    {
      name: 'UPT',
      type: 'bar',
      data: [34, 42],
      label: {
        show: true,
        position: 'inside',
      },
    },
    {
      name: 'User Count',
      type: 'bar',
      data: [10],
      label: {
        show: true,
        position: 'inside',
      },
    },
  ],
}

export const segmentGraphData: ReactEChartsProps['option'] = {
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    icon: 'circle',
  },
  xAxis: {
    type: 'category',
    data: ['2696', '2701'],
  },
  yAxis: {
    type: 'value',
    axisTick: {
      length: 6,
      lineStyle: {
        type: 'dashed',
        color: '#EDEDED',
      },
    },
  },
  color: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter(params: string | any[]) {
      let tooltip = `<span style="font-size:10px">${params[0].name}</span><table>`
      for (let i = 0; i < params.length; i += 1) {
        const param = params.at(i)
        tooltip += `<tr style="color:${param.color}" ><td>${param.seriesName}</td><td>:</td><td>${param.value}</td></tr>`
      }
      tooltip += '</table>'
      return tooltip
    },
  },
  series: [
    {
      name: 'Offline',
      type: 'bar',
      data: [6, 5],
      label: {
        show: true,
        position: 'inside',
      },
    },
    {
      name: 'Online',
      type: 'bar',
      data: [6, 5],
      label: {
        show: true,
        position: 'inside',
      },
    },
  ],
}

export const productCategoryGraphData: ReactEChartsProps['option'] = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 'center',
    icon: 'circle',
  },
  xAxis: {
    type: 'category',
    data: ['2696', '2701'],
  },
  yAxis: {
    type: 'value',
    axisTick: {
      length: 6,
      lineStyle: {
        type: 'dashed',
        color: '#EDEDED',
      },
    },
  },
  color: ['#2A4A64', '#0265AD', '#09918B', '#E50101', '#FF8B00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter(params: string | any[]) {
      let tooltip = `<span style="font-size:10px">${params[0].name}</span><table>`
      for (let i = 0; i < params.length; i += 1) {
        const param = params.at(i)
        tooltip += `<tr style="color:${param.color}" ><td>${param.seriesName}</td><td>:</td><td>${param.value}</td></tr>`
      }
      tooltip += '</table>'
      return tooltip
    },
  },
  series: [
    {
      name: 'Breakfast',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Breakfast EVM/Combo',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Cold Drinks',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Desserts',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'EVM',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Fries',
      data: [26, 22],
      type: 'bar',
    },
    {
      name: 'Hot Drinks',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Juices',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Nuggets',
      data: [0, 56],
      type: 'bar',
    },
    {
      name: 'SN CORE',
      data: [50, 102],
      type: 'bar',
    },
    {
      name: 'SN EDAP',
      data: [80, 41],
      type: 'bar',
    },
    {
      name: 'SN PREMIUM',
      data: [141, 111],
      type: 'bar',
    },
    {
      name: 'Shakes',
      data: [0, 0],
      type: 'bar',
    },
    {
      name: 'Starters & Salad',
      data: [218, 297],
      type: 'bar',
    },
  ],
}
