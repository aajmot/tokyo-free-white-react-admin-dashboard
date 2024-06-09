import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataTable from "src/components/DataTable/DataTable";
import ListTable from "src/components/ListTable/ListTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { CryptoOrder } from "src/models/crypto_order";
import CustomerForm from "./CustomerForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";
import { CustomerService } from "src/Inevntory/Services/CustomerService";

export default function CustomerPage() {
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
            key: "customerType",
            type: "string",
            format: ""
        },
        {
            label: "Name",
            key: "customerName",
            type: "string",
            format: ""
        },
        {
            label: "Phone Number",
            key: "customerPhone",
            type: "string",
            format: ""
        },
        {
            label: "Email",
            key: "customerEmail",
            type: "string",
            format: ""
        },
        {
            label: "Address",
            key: "customerAddress",
            type: "string",
            format: ""
        }
    ];

    let _data = [];
    const [service, Setservice] = useState(new CustomerService());



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
            <title>Customer - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Customers"
                subHeading={"Customers " + mode}
                mode={setmode}
                docs={mode}
                addAction={addAction}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") ? <DataTable {...listData} />
                :
                <CustomerForm {...formParam} />
            }
        </Container>

    </>);
}