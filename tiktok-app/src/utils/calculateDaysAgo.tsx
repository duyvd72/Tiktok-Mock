const checkTimeAgo = (daysAgo: number): string => {
    if (daysAgo < 1) {
        const hoursAgo = Math.ceil(daysAgo * 24);
        return `${hoursAgo}hr${hoursAgo === 1 ? '' : 's'} ago`;
      } else if (daysAgo < 7) {
        return `${daysAgo}d ago`;
      } else if (daysAgo < 30) {
        const weeksAgo = Math.floor(daysAgo / 7);
        return `${weeksAgo}wk${weeksAgo === 1 ? '' : 's'} ago`;
      } else {
        const monthsAgo = Math.floor(daysAgo / 30);
        return `${monthsAgo}m ago`;
      }
  };

const calculateDaysAgo = (createdAt: string): string => {
    const [day, month, year] = createdAt.split('/'); 
    const formattedDate = `${year}-${month}-${day}`; 
    const videoDate = new Date(formattedDate);
    const today = new Date();
    const timeDifference = today.getTime() - videoDate.getTime();
    const daysAgo = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return checkTimeAgo(daysAgo);
};

export default calculateDaysAgo;