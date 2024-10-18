"use client";

import { DataTableDemo } from "../table/data-table";

type Props = {
  projectId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Table = ({projectId}: Props) => {

  return (
    <DataTableDemo />
  )
}

export default Table;