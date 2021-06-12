
import { paginate } from ".";

export default function getPagedData(state, data) {
  const { pageSize, currentPage } = state;
  return {
    totalCount: data.length,
    data: paginate(data, currentPage, pageSize),
  };
}
