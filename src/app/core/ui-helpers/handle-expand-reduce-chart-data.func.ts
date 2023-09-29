import { ChartComponentProps } from '../types/chart-component-props.type';

export function handleExpandReduceChartData(item: ChartComponentProps) {
  if (item.expanded) {
    item.displayLabels = item.labels;
    item.displayDatasets = item.datasets;
  } else {
    item.displayLabels = item.labels.slice(0, 5);
    item.displayDatasets = item.datasets.slice(0, 5);
  }
}
