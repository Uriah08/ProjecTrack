"use client";

import { DataTableDemo } from "../table/data-table";

type Props = {
  projectId: string
}

const Table = ({projectId}: Props) => {

  return (
    <DataTableDemo />
  )
}

export default Table;