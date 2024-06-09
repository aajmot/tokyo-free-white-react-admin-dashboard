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
    const [mode, setmode] = useState("list");
    const [formParam, setformParam] = useState(
        {
            setmode: setmode,
            settoaster: settoaster,
            setloader: setloader,
            data: null
        }
    );
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
        enableEdit: true,
        enableDelete: true,
        editAction: editAction,
        deleteAction: deleteAction
    });




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

    const loadInit = () => {
        loadTabledata();
    }

    useEffect(() => {
        loadInit();
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
                addAction={addAction}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") ? <DataTable {...listData} />
                :
                <SupplierForm {...formParam} />
            }
        </Container>

    </>);
}