import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
    const [open, setOpen] = useState(initialState);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const toggle = () => setOpen(prev => !prev);

    return { open, handleOpen, handleClose, toggle };
};

export default useToggle;