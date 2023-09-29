import { ChartDatasetVectorAndLabel } from "./chart-dataset-vector-and-label.type";

export type ChartComponentProps = {
    id: string,
    type: 'pie' | 'bar' | 'scatter';
    labels: string[];
    datasets: ChartDatasetVectorAndLabel[];
};