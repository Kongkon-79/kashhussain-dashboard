export type RecentTransactionItem = {
  id: string;
  name: string;
  avatar: string;
  action: string;
  timeAgo: string;
};

export const recentTransactionsData: RecentTransactionItem[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "Took the Basic Check subscription",
    timeAgo: "2 min ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/100?img=2",
    action: "Took the Basic Check subscription",
    timeAgo: "2 min ago",
  },
  {
    id: "3",
    name: "Emma Williams",
    avatar: "https://i.pravatar.cc/100?img=3",
    action: "Took the Gold Check subscription",
    timeAgo: "5 min ago",
  },
];