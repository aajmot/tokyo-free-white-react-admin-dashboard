import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";

interface IDataTableModel {
    headers: Array<string>,
    data: any,
}
export default function DataTable(props: IDataTableModel) {
    console.log('props', props);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {(props?.headers ?? []).map((headerItem, headerIndex) => (
                                <TableCell key={"header_" + headerIndex}>{headerItem}</TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(props?.data ?? []).map((dataItem, dataIndex) => (
                            <TableRow key={"dataRow_" + dataIndex}>
                                {(props?.headers ?? []).map((headerItem, headerIndex) => (
                                    <TableCell key={"dataRow_header_" + headerIndex}>{dataItem[headerItem]}</TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer >
        </>

    );
}