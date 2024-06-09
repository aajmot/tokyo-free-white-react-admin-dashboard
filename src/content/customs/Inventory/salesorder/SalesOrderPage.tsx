import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataTable from "src/components/DataTable/DataTable";
import ListTable from "src/components/ListTable/ListTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { CryptoOrder } from "src/models/crypto_order";
import SalesOrderForm from "./SalesOrderForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";
import { SalesOrderService } from "src/Inevntory/Services/SalesOrderService";

export default function SalesOrderPage() {
    const [toaster, settoaster] = useState({ open: false, type: "", header: "", body: "" });
    const [loader, setloader] = useState({ loading: false });
    const _headers = [
        {
            label: "orderNumber",
            key: "orderNumber",
            type: "string",
            format: ""
        },
        {
            label: "orderDate",
            key: "orderDate",
            type: "string",
            format: ""
        },
        {
            label: "grossAmount",
            key: "grossAmount",
            type: "string",
            format: ""
        },
        {
            label: "discountPercentage",
            key: "discountPercentage",
            type: "string",
            format: ""
        },
        {
            label: "discountAmount",
            key: "discountAmount",
            type: "string",
            format: ""
        },
        {
            label: "roundOff",
            key: "roundOff",
            type: "string",
            format: ""
        },
        {
            label: "netAmount",
            key: "netAmount",
            type: "string",
            format: ""
        }
    ];

    let _data = [];
    const [service, Setservice] = useState(new SalesOrderService());
    const [mode, setmode] = useState("list");

    const editAction = async (rowData) => {
        setmode("edit");
        setformParam({
            ...formParam,
            data: rowData
        })
    }
    const deleteAction = async (rowData) => {
        if (confirm("do you want delete this item?")) {
            setloader({ loading: true });
            const deleteResult = await service.delete({ id: rowData?.id });
            if (deleteResult && deleteResult.isSuccess) {
                settoaster({ open: true, type: "success", header: "", body: deleteResult?.message });
                loadTabledata();
            }
            else {
                settoaster({ open: true, type: "error", header: "", body: deleteResult?.message });
            }
            setloader({ loading: false });
        }
    }

    let [listData, setlistData] = useState({
        headers: _headers,
        data: [],
        enableEdit: false,
        enableDelete: true,
        editAction: editAction,
        deleteAction: deleteAction
    });
    const [formParam, setformParam] = useState({
        setmode: setmode,
        settoaster: settoaster,
        setloader: setloader,
        data: null
    });
    const addAction = () => {
        if (mode == "list") {
            setmode("add");
            setformParam({
                ...formParam,
                data: null
            })
        }
        else {
            setmode("list");
        }

    }

    const loadTabledata = async () => {
        setloader({ loading: true });
        var response = await service.search({});
        if (response.isSuccess) {
            _data = response?.data;
            setlistData(
                {
                    ...listData,
                    data: _data
                }

            );
        }
        setloader({ loading: false });
    }

    useEffect(() => {
        loadTabledata();
    }, []);



    return (<>

        <Toaster {...toaster}></Toaster>
        <Loader {...loader} ></Loader>

        <Helmet>
            <title>SalesOrder - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="SalesOrders"
                subHeading={"SalesOrders " + mode}
                mode={setmode}
                docs={mode}
                addAction={addAction}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <SalesOrderForm {...formParam} />}
        </Container>

    </>);
}