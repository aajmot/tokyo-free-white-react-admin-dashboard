import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import PropTypes from 'prop-types';
interface IDataTableModel {
    headers: Array<IDataTableHeaderModel>,
    data: any,
}
interface IDataTableHeaderModel {
    label: string,
    key: string,
    type: string,
    format: string
}
function DataTable(props: IDataTableModel) {
    let [searchableData, setsearchableData] = useState([]);
    const [tableData, settableData] = useState([]);

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };
    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const applyPagination = (
        tableData: any[],
        page: number,
        limit: number
    ): any[] => {
        return tableData.slice(page * limit, page * limit + limit);
    };


    const pageData = applyPagination(
        tableData,
        page,
        limit
    );

    const initData = async () => {
        setsearchableData(props?.data);
        settableData(props?.data);
        applyPagination(
            tableData,
            page,
            limit
        );
    }
    useEffect(() => {
        initData();
    }, [props]);



    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {(props?.headers ?? []).map((headerItem, headerIndex) => (
                                <TableCell key={"header_" + headerIndex}>{headerItem.label}</TableCell>
                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(pageData ?? []).map((dataItem, dataIndex) => (
                            <TableRow key={"dataRow_" + dataIndex}>
                                {(props?.headers ?? []).map((headerItem, headerIndex) => (
                                    <TableCell key={"dataRow_header_" + headerIndex}>{dataItem[headerItem.key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer >
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={tableData.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                />
            </Box>
        </>

    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
};
DataTable.defaultProps = {
    data: [],
    headers: []
};
export default DataTable;