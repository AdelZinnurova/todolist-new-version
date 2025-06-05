import {ChangeEvent, type KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type CreateItemFormPropsType = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: CreateItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState('')
    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setItemTitle('')
        }
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }
    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                value={itemTitle}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <IconButton onClick={createItemHandler}>
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    );
};