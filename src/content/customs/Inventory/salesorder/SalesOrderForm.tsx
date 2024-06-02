
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { RoleService } from "src/Admin/Services/RoleService";
import { CustomerService } from "src/Inevntory/Services/CustomerService";
import { SalesOrderService } from "src/Inevntory/Services/SalesOrderService";
import Paper from '@mui/material/Paper';
import { ProductService } from "src/Inevntory/Services/ProductService";

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
                        <TableCell align="right">Total Amt</TableCell>
                        <TableCell align="right">Discount(%)</TableCell>
                        <TableCell align="right">Discount(Amt)</TableCell>
                        <TableCell align="right">SCH(%)</TableCell>
                        <TableCell align="right">SCH(Amt)</TableCell>
                        <TableCell align="right">GST(%)</TableCell>
                        <TableCell align="right">GST(Amt)</TableCell>
                        <TableCell align="right">Gross(Amt)</TableCell>
                        <TableCell align="right">Roundoff(Amt)</TableCell>
                        <TableCell align="right">Net(Amt)</TableCell>
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
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"quantity" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"freeQuantity" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"mrp" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"rate" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"totalAmount" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"discountPercentage" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"discountAmount" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"schPercentage" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"schAmount" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"gstPercentage" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"gstAmount" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"grossAmount" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"roundOff" + index}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    required
                                    id={"netAmount" + index}
                                />
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





        </Box>
    </>);
}