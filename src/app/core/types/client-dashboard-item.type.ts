import { ClientDashboardGraphTypes } from '../enum/client-dashboard-graph-types.enum';

export type ClientDashboardItem = {
  id: string;
  title: string;
  type: ClientDashboardGraphTypes;
  selected: boolean;
  expanded: boolean;
  handleExpandSelection: (item: ClientDashboardItem) => void;
};
