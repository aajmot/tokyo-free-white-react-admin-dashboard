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

export default function UserPage() {
    const _headers = ["id", "firstName", "lastName", "userName", "email", "gender"];
    let _data = [];
    const [service, Setservice] = useState(new UserService());
    const [mode, setmode] = useState("list");
    let [listData, setlistData] = useState({
        headers: _headers,
        data: []
    });
    const loadTabledata = async () => {
        var response = await service.search({});
        if (response.isSuccess) {
            _data = response?.data;
            setlistData({ headers: _headers, data: _data })
        }
    }
    const changeMode = (action) => {
        setmode(action);
    }
    useEffect(() => {
        loadTabledata();
    }, []);



    return (<>
        <Helmet>
            <title>User - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Users"
                subHeading={"Users " + { mode }}
                mode={changeMode}
                docs={mode}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <UserForm />}
        </Container>

    </>);
}