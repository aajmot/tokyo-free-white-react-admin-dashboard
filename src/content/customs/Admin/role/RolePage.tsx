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

    const _headers = [
        {
            label: "Role Name",
            key: "name",
            type: "string",
            format: ""
        },
        {
            label: "added/updated By",
            key: "updatedBy",
            type: "string",
            format: ""
        },
        {
            label: "Modified Date",
            key: "updatedDate",
            type: "string",
            format: ""
        }
    ];
    let _data = [];
    const [service, Setservice] = useState(new RoleService());
    const [mode, setmode] = useState<string>("list");

    const [formParam, setformParam] = useState(
        {
            setmode: setmode,
            settoaster: settoaster,
            setloader: setloader,
            data: null
        }
    );
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
            <title>Role - Management</title>
        </Helmet>
        <PageTitleWrapper>
            <PageTitle
                heading="Roles"
                subHeading={"Roles " + mode}
                mode={setmode}
                docs={mode}
                addAction={addAction}
            />
        </PageTitleWrapper>

        <Container maxWidth="lg">
            {(mode === "list") ? <DataTable {...listData} />
                :
                <RoleForm {...formParam} />
            }
        </Container>

    </>);
}