
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { CustomerService } from "src/Inevntory/Services/CustomerService";
import { SalesOrderService } from "src/Inevntory/Services/SalesOrderService";
import Paper from '@mui/material/Paper';
import { ProductService } from "src/Inevntory/Services/ProductService";
import DeleteIcon from '@mui/icons-material/Delete';

export default function SalesOrderForm(props) {
    const [service, setservice] = useState(new SalesOrderService());
    const [customerService, setcustomerService] = useState(new CustomerService());
    const [productService, setproductService] = useState(new ProductService());
    const [customerList, setcustomerList] = useState([]);
    const [customerId, setcustomerId] = useState<number>(0);
    const [itemIndex, setitemIndex] = useState<number>(1);
    const [productList, setproductList] = useState([]);

    let [orderDetails, setorderDetails] = useState([
        {
            itemIndex: 1,
            productId: 0,
            unit: null,
            quantity: 0,
            freeQuantity: 0,
            mrp: 0,
            rate: 0,
            discountPercentage: 0,
            discountAmount: 0,
            totalAmount: 0,
            schPercentage: 0,
            schAmount: 0,
            gstPercentage: 0,
            gstAmount: 0,
            grossAmount: 0,
            roundOff: 0,
            netAmount: 0
        }

    ]);

    const handleCustomerChange = (event) => {
        setcustomerId(event.target.value);
    };

    const save = async (e: any) => {
        e.preventDefault();
        props?.setloader(true);
        const payload = {
            name: e.currentTarget["name"]?.value,
            description: e.currentTarget["description"]?.value,
            hsn: e.currentTarget["hsn"]?.value,
            primaryUnit: e.currentTarget["primaryUnit"]?.value,
            secondaryUnit: e.currentTarget["secondaryUnit"]?.value,
            gstPercentage: e.currentTarget["gstPercentage"]?.value,
            brandName: e.currentTarget["brandName"]?.value,
            manufacturer: e.currentTarget["manufacturer"]?.value,
            composition: e.currentTarget["composition"]?.value,
            tags: e.currentTarget["tags"]?.value
        };
        debugger;
        var response = await service.create(payload);
        if (response && response.isSuccess) {
            props?.settoaster({ open: true, type: "success", header: "", body: response?.message })
        }
        else {
            props?.settoaster({ open: true, type: "error", header: "", body: response?.message })
        }
        props?.setloader(false);
    }

    const addItems = (e) => {
        setitemIndex(itemIndex + 1);
        e.preventDefault();
        orderDetails.push(
            {
                itemIndex: itemIndex,
                productId: 0,
                unit: 0,
                quantity: 0,
                freeQuantity: 0,
                mrp: 0,
                rate: 0,
                totalAmount: 0,
                discountPercentage: 0,
                discountAmount: 0,
                schPercentage: 0,
                schAmount: 0,
                gstPercentage: 0,
                gstAmount: 0,
                grossAmount: 0,
                roundOff: 0,
                netAmount: 0
            }
        )
    }
    const hanldeItemSelection = async (row, index, e) => {
        debugger;
        let productResponse = await productService?.get(parseInt(e.target.value));
        debugger;
        if (productResponse && productResponse?.isSuccess) {
            orderDetails[index] = {
                ...row
                , productId: parseInt(e.target.value)
                , unit: productResponse?.data[0]?.primaryUnit
                , mrp: productResponse?.data[0]?.rate ?? 0
                , rate: productResponse?.data[0]?.rate ?? 0
                , gstPercentage: productResponse?.data[0]?.gstPercentage ?? 0
            }
            setorderDetails([...orderDetails]);
        }

    };

    const handleRemoveItem = (index) => {
        setorderDetails(orderDetails.filter((_, i) => i !== index));
    };

    const claculateFormData = (index, orderDetails) => {
        debugger;
        orderDetails[index] = {
            ...orderDetails[index],
            discountAmount: orderDetails[index]?.mrp - orderDetails[index]?.rate,
            discountPercentage: (orderDetails[index]?.discountAmount / orderDetails[index]?.mrp)*100,
            totalAmount: orderDetails[index]?.rate * orderDetails[index]?.quantity,
            gstAmount: (orderDetails[index]?.totalAmount * orderDetails[index]?.gstPercentage) / 100
        }
        setorderDetails([...orderDetails]);
    }


    const getInitData = async () => {
        //get customer
        var customerResponse = await customerService.search({});
        if (customerResponse && customerResponse.isSuccess) {
            setcustomerList(customerResponse?.data);
        }
        else {
            setcustomerList([]);
        }

        //get products 
        const productResponse = await productService.search({});
        if (productResponse && productResponse?.isSuccess) {
            setproductList(productResponse?.data);
        }
        else {
            setproductList([]);
        }
    }

    useEffect(() => {
        getInitData();
    }, []);

    return (<>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            autoComplete="off"
            onSubmit={save}
        >
            {customerList?.length > 0 && <TextField
                required
                select
                id="customerId"
                label="Customer"
                value={customerId}
                onChange={handleCustomerChange}
            >
                {customerList.map((option, index) => (
                    <MenuItem key={"type_" + index} value={option.id}>
                        {option.customerName}
                    </MenuItem>
                ))}
            </TextField>
            }

            <TextField
                required
                id="orderNumber"
                label="Order#"
            />

            <TextField
                required
                id="orderDate"
                label="Order Date."
                type="date"
            />

            {/* <CardContent>
                <TableContainer component={Paper}> */}
            <Table sx={{ minWidth: 650, overflow: 'scroll' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Free Qty</TableCell>
                        <TableCell align="right">MRP</TableCell>
                        <TableCell align="right">Rate</TableCell>
                        <TableCell align="right">Discount(%)</TableCell>
                        <TableCell align="right">Discount(Amt)</TableCell>
                        <TableCell align="right">Total Amt</TableCell>
                        <TableCell align="right">SCH(%)</TableCell>
                        <TableCell align="right">SCH(Amt)</TableCell>
                        <TableCell align="right">GST(%)</TableCell>
                        <TableCell align="right">GST(Amt)</TableCell>
                        <TableCell align="right">Gross(Amt)</TableCell>
                        <TableCell align="right">Roundoff(Amt)</TableCell>
                        <TableCell align="right">Net(Amt)</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderDetails.map((row, index) => (
                        <TableRow
                            key={row?.itemIndex}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">
                                {row?.itemIndex}
                            </TableCell>

                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"productId" + index}
                                    select
                                    value={row?.productId}
                                    //hanldeItemSelection
                                    onChange={(e) => hanldeItemSelection(row, index, e)}
                                >
                                    {productList.map((option, pindex) => (
                                        <MenuItem key={"product_" + index + "_" + pindex} value={option?.id}>
                                            {option?.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"unit" + index}
                                    value={orderDetails[index]?.unit}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, unit: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"quantity" + index}
                                    value={orderDetails[index]?.quantity}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, quantity: parseInt(e.target.value)
                                        }
                                        claculateFormData(index, orderDetails)
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"freeQuantity" + index}
                                    value={orderDetails[index]?.freeQuantity}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, freeQuantity: parseInt(e.target.value)
                                        }
                                        claculateFormData(index, orderDetails)
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    disabled
                                    id={"mrp" + index}
                                    value={orderDetails[index]?.mrp}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, mrp: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"rate" + index}
                                    value={orderDetails[index]?.rate}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, rate: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                        claculateFormData(index, orderDetails)
                                    }
                                    }
                                />
                            </TableCell>

                            <TableCell align="right">
                                <TextField
                                    required
                                    disabled
                                    id={"discountPercentage" + index}
                                    value={orderDetails[index]?.discountPercentage}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, discountPercentage: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    disabled
                                    id={"discountAmount" + index}
                                    value={orderDetails[index]?.discountAmount}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, discountAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>

                            <TableCell align="right">
                                <TextField
                                    required
                                    disabled
                                    id={"totalAmount" + index}
                                    value={orderDetails[index]?.totalAmount}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, totalAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>

                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"schPercentage" + index}
                                    value={orderDetails[index]?.schPercentage ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, schPercentage: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"schAmount" + index}
                                    value={orderDetails[index]?.schAmount ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, schAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"gstPercentage" + index}
                                    value={orderDetails[index]?.gstPercentage ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, gstPercentage: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"gstAmount" + index}
                                    value={orderDetails[index]?.gstAmount ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, gstAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"grossAmount" + index}
                                    value={orderDetails[index]?.grossAmount ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, grossAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"roundOff" + index}
                                    value={orderDetails[index]?.roundOff ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, roundOff: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"netAmount" + index}
                                    value={orderDetails[index]?.netAmount ?? 0}
                                    onChange={(e) => {
                                        orderDetails[index] = {
                                            ...row, netAmount: parseInt(e.target.value)
                                        }
                                        setorderDetails([...orderDetails]);
                                    }
                                    }
                                />
                            </TableCell>


                            <TableCell align="right">

                                <IconButton
                                    onClick={() => {
                                        handleRemoveItem(index)
                                    }}
                                >
                                    <DeleteIcon color='warning' fontSize='small' titleAccess='delete_action' />
                                </IconButton>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={16}>
                            <Button sx={{ margin: 1 }}
                                variant="contained"
                                onClick={addItems}
                            >
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableFooter>
            </Table>
            {/*    </TableContainer>

            </CardContent> */}



            <TextField
                required
                id="grossAmount"
                label="Gross Amt."
            />

            <TextField
                required
                id="discountPercentage"
                label="Disc.(%)"
            />

            <TextField
                required
                id="discountAmount"
                label="Disc.(Amt)"
            />

            <TextField
                required
                id="roundOff"
                label="RoundOff(Amt)"
            />
            <TextField
                required
                id="netAmount"
                label="Net(Amt)"
            />


            <CardContent>
                <Button sx={{ margin: 1 }}
                    type="submit"
                    variant="contained">
                    Save
                </Button>
                <Button sx={{ margin: 1 }} variant="contained" color="secondary"
                    onClick={() => {
                        props?.setmode("list")
                    }}
                >
                    Cancel
                </Button>
            </CardContent>





        </Box >
    </>);
}