export function getLocalData() {
  const localData = localStorage.getItem("localPlans");
  const localPlans = localData ? JSON.parse(localData) : [];
  const localData1 = localStorage.getItem("localMembers");
  const localmembers = localData1 ? JSON.parse(localData1) : [];
  return { localPlans, localmembers };
}

export function setLocalData(plans, members) {
  localStorage.setItem("localPlans", JSON.stringify(plans));
  localStorage.setItem(
    "localMembers",
    JSON.stringify(members.slice(0, Math.min(8, members.length)))
  );
}

export function getLocalCount(name) {
  const localData = localStorage.getItem(`${name}`);
  return localData ? localData : 0;
}
export function storeLocalCount(name, count) {
  localStorage.setItem(`${name}`, count);
}

// export function getLocalLeadsCount() {
//   const localData2 = localStorage.getItem("leadsCount");
//   return localData2 ? localData2 : 0;
// }

// export function storeLocalCount(membersCount, leadsCount) {
//   localStorage.setItem("membersCount", membersCount);
//   localStorage.setItem("leadsCount", leadsCount);
// }
