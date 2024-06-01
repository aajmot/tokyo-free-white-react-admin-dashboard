import { Box, Container } from "@mui/material";
import { subDays } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { RoleService } from "src/Admin/Services/RoleService";
import DataTable from "src/components/DataTable/DataTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import RoleForm from "./RoleForm";
import Toaster from "src/components/Toaster/Toaster";
import Loader from "src/components/Loader/Loader";

export default function RolePage() {
    const [toaster, settoaster] = useState({ open: false, type: "", header: "", body: "" });
    const [loader, setloader] = useState({ loading: false });

    const _headers = ["name", "updatedBy", "updatedDate"];
    let _data = [];
    const [service, Setservice] = useState(new RoleService());
    const [mode, setmode] = useState<string>("list");
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
            <title>Role - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Roles"
                subHeading={"Roles " + mode}
                mode={setmode}
                docs={mode}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") && <DataTable {...listData} />}
            {(mode === "add") && <RoleForm {...formParam} />}
        </Container>

    </>);
}