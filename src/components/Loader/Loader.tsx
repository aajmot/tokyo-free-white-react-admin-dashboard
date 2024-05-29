import { useEffect, useState } from 'react';
import { LoaderModel } from './LoaderModel';
import { CircularProgress } from '@mui/material';

export default function Loader(prop: LoaderModel) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("loader value set to ", prop?.loading)
        setLoading(prop?.loading ?? false);

    }, [prop]);

    return (
        <>
            {loading &&


                <CircularProgress />

            }
        </>
    );
}
