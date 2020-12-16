import { Paper } from "@material-ui/core";


import React, {useContext, useReducer} from "react";
import Button from "@material-ui/core/Button";

const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}

const UserForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Paper elevation={0}>
            <form noValidate autoComplete="off">
                {/*<TextField id="standard-basic" label="Standard" />*/}
                {/*<TextField id="filled-basic" label="Filled" variant="filled" />*/}
                {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
                {/*<Button*/}
                {/*    color="primary"*/}
                {/*    variant="contained"*/}
                {/*    fullWidth*/}
                {/*    type="submit"*/}
                {/*    // disabled={formik.isSubmitting}*/}
                {/*>*/}
                {/*    UPDATE DATA*/}
                {/*</Button>*/}
            </form>
        </Paper>
    );
};

export default UserForm;
