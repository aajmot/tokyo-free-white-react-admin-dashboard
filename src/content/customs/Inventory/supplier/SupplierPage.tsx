import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataTable from "src/components/DataTable/DataTable";
import ListTable from "src/components/ListTable/ListTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { CryptoOrder } from "src/models/crypto_order";
import SupplierForm from "./SupplierForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";
import { SupplierService } from "src/Inevntory/Services/SupplierService";

export default function SupplierPage() {
    const [toaster, settoaster] = useState({ open: false, type: "", header: "", body: "" });
    const [loader, setloader] = useState({ loading: false });
    const _headers = [
        {
            label: "Type",
            key: "supplierType",
            type: "string",
            format: ""
        },
        {
            label: "Name",
            key: "supplierName",
            type: "string",
            format: ""
        },
        {
            label: "Phone Number",
            key: "supplierPhone",
            type: "string",
            format: ""
        },
        {
            label: "Email",
            key: "supplierEmail",
            type: "string",
            format: ""
        },
        {
            label: "Address",
            key: "supplierAddress",
            type: "string",
            format: ""
        }
    ];

    let _data = [];
    const [service, Setservice] = useState(new SupplierService());
    const [mode, setmode] = useState("list");
    let [listData, setlistData] = useState({
        headers: _headers,
        data: []
    });
    const [formParam, setformParam] = useState({});

    const loadTabledata = async () => {
        debugger;
        setloader({ loading: true });
        var response = await service.search({});
        if (response.isSuccess) {
            _data = response?.data;
            setlistData({ headers: _headers, data: _data });
        }
        setloader({ loading: false });
    }

    useEffect(() => {
        loadTabledata();
        setformParam({
            setmode: setmode,
            settoaster: settoaster,
            setloader: setloader
        })
    }, []);



    return (<>

        <Toaster {...toaster}></Toaster>
        <Loader {...loader} ></Loader>

        <Helmet>
            <title>Supplier - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Suppliers"
                subHeading={"Suppliers " + mode}
                mode={setmode}
                docs={mode}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <SupplierForm {...formParam} />}
        </Container>

    </>);
}