import _ from "lodash";
import { paginate } from ".";

export default function getPagedData(state, arrays, path) {
  const {
    pageSize,
    currentPage,
    sortColumn,
    selectedPlan,
    searchQuery,
    numberSearchQuery,
    planEndSearchQuery,
    fpIdSearchQuery,
  } = state;

  let filtered = arrays;

  // // console.log(filtered.length);
  // if (path === "/inactive-members")
  //   filtered = filtered.filter(
  //     (m) =>
  //       new Date(new Date().getTime()) >
  //       new Date(new Date(m.plan_end_date).toDateString()).getTime()
  //   );
  // else if(path === "/members")
  //   filtered = filtered.filter(
  //     (m) =>
  //       new Date(new Date().getTime()) <=
  //       new Date(new Date(m.plan_end_date).toDateString()).getTime()
  //   );

  // if (numberSearchQuery)
  //   filtered = filtered.filter((m) =>
  //     m.phone.toLowerCase().startsWith(numberSearchQuery.trim().toLowerCase())
  //   );

  // if (fpIdSearchQuery)
  //   filtered = filtered.filter(
  //     (m) => m.fpId && m.fpId.startsWith(fpIdSearchQuery.trim())
  //   );

  // if (searchQuery)
  //   filtered = filtered.filter((m) =>
  //     m.name.toLowerCase().startsWith(searchQuery.trim().toLowerCase())
  //   );

  // if (planEndSearchQuery) {
  //   let datePlanEnd = planEndSearchQuery.split("/");
  //   filtered = filtered.filter(
  //     (m) =>
  //       new Date(new Date(m.plan_end_date).toDateString()).getTime() ===
  //       new Date(
  //         `${datePlanEnd[1]}/${datePlanEnd[0]}/${datePlanEnd[2]}`
  //       ).getTime()
  //   );
  // } else if (selectedPlan && selectedPlan._id)
  //   filtered = arrays.filter((m) => m.plan._id === selectedPlan._id);

  // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  // const datamembers = paginate(sorted, currentPage, pageSize);
  const datamembers = paginate(filtered, currentPage, pageSize);

  return { totalCount: filtered.length, data: datamembers };
}
