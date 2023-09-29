import { ChartDatasetVectorAndLabel } from './chart-dataset-vector-and-label.type';

export type ChartComponentProps = {
  id: string;
  title: string;
  type: 'pie' | 'bar' | 'scatter';
  labels: string[];
  displayLabels: string[];
  datasets: ChartDatasetVectorAndLabel[];
  displayDatasets: ChartDatasetVectorAndLabel[];
  selected: boolean;
  expanded: boolean;
  handleExpandSelection: (item: ChartComponentProps) => void;
};
