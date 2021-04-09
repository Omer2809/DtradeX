export default function getCurrentPage(members, originalCurrentPage, pageSize) {
  return members.length > pageSize - 1 &&
    members.length % pageSize === 0 &&
    members.length / pageSize + 1 === originalCurrentPage
    ? originalCurrentPage - 1
    : originalCurrentPage;
}
