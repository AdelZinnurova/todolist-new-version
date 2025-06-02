import {ChangeEvent, type KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

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
            <input
                value={itemTitle}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <Button
                title={'+'}
                onClick={createItemHandler}
            />
        </div>
    );
};