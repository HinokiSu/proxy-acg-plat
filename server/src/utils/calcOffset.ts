// calc
export const calcOffset = (curPage: string | number, pageSize: string |number) =>
  (typeof curPage === 'string' ? parseInt(curPage) - 1 : curPage) *
  (typeof pageSize === 'string' ? parseInt(pageSize) : pageSize)
