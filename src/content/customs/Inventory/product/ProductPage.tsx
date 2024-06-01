import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataTable from "src/components/DataTable/DataTable";
import ListTable from "src/components/ListTable/ListTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { CryptoOrder } from "src/models/crypto_order";
import ProductForm from "./ProductForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";
import { ProductService } from "src/Inevntory/Services/ProductService";

export default function ProductPage() {
    const [toaster, settoaster] = useState({ open: false, type: "", header: "", body: "" });
    const [loader, setloader] = useState({ loading: false });
    const _headers = [
        {
            label: "Name",
            key: "name",
            type: "string",
            format: ""
        },
        {
            label: "Desc",
            key: "description",
            type: "string",
            format: ""
        },
        {
            label: "HSN",
            key: "hsn",
            type: "string",
            format: ""
        },
        {
            label: "Unit(P)",
            key: "primaryUnit",
            type: "string",
            format: ""
        },
        {
            label: "Unit(S)",
            key: "secondaryUnit",
            type: "string",
            format: ""
        },
        {
            label: "GST",
            key: "gstPercentage",
            type: "string",
            format: ""
        },
        {
            label: "Brand",
            key: "brandName",
            type: "string",
            format: ""
        },
        {
            label: "Manufacturer",
            key: "manufacturer",
            type: "string",
            format: ""
        },
        {
            label: "Composition",
            key: "composition",
            type: "string",
            format: ""
        },
    ];

    let _data = [];
    const [service, Setservice] = useState(new ProductService());
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
            <title>Product - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Products"
                subHeading={"Products " + mode}
                mode={setmode}
                docs={mode}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <ProductForm {...formParam} />}
        </Container>

    </>);
}