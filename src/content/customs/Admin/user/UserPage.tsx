import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserService } from "src/Admin/Services/UserService";
import DataTable from "src/components/DataTable/DataTable";
import ListTable from "src/components/ListTable/ListTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { CryptoOrder } from "src/models/crypto_order";
import UserForm from "./UserForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";

export default function UserPage() {
    const [toaster, settoaster] = useState({ open: false, type: "", header: "", body: "" });
    const [loader, setloader] = useState({ loading: false });

    const _headers = [
        {
            label: "First Name",
            key: "firstName",
            type: "string",
            format: ""
        },
        {
            label: "Last Name",
            key: "lastName",
            type: "string",
            format: ""
        },
        {
            label: "User Name",
            key: "userName",
            type: "string",
            format: ""
        },
        {
            label: "Email",
            key: "email",
            type: "string",
            format: ""
        },
        {
            label: "Gender",
            key: "gender",
            type: "string",
            format: ""
        },
        {
            label: "Role",
            key: "roles",
            type: "string",
            format: ""
        },
    ];
    let _data = [];
    const [service, Setservice] = useState(new UserService());
    const [mode, setmode] = useState("list");
    let [listData, setlistData] = useState({
        headers: _headers,
        data: []
    });
    const [formParam, setformParam] = useState({});

    const loadTabledata = async () => {
        setloader({ loading: true });
        var response = await service.search({});
        if (response.isSuccess) {
            _data = response?.data;
            _data.forEach(p => p.roles = p?.role?.name)
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
            <title>User - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Users"
                subHeading={"Users " + mode}
                mode={setmode}
                docs={mode}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <UserForm {...formParam} />}
        </Container>

    </>);
}