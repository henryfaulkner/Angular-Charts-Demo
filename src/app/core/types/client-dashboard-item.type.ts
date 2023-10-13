export type ClientDashboardItem = {
    id: string;
    title: string;
    type: 'flagged-invoice-chart' | 'nowaccount-difference';
    selected: boolean;
    expanded: boolean;
    handleExpandSelection: (item: ClientDashboardItem) => void;
};