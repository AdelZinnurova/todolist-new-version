import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [itemTitle, setItemTitle] = useState<string>(title);

    const onEditable = () => setIsEditable(true);
    const offEditable = () => {
        changeTitle(itemTitle);
        setIsEditable(false);
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }
    return (
        isEditable
            ? <input
                value={itemTitle}
                onChange={changeTitleHandler}
                onBlur={offEditable}
                autoFocus
            />
            : <span onDoubleClick={onEditable}>{title}</span>
    );
};