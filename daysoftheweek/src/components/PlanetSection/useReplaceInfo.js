import { useState, useRef } from 'react';

const useDataChange = (data) => {
    const [currentData, setCurrentData] = useState(data.overview);
    const [isChanging, setIsChanging] = useState(false);
    const [currentTab, setCurrentTab] = useState('overview');
    const prevTab = useRef('overview');
    const isTransitionend = useRef(true);
    const transitionDuration = 2000;
    const halfTransitionDuration = transitionDuration / 2;


    const handleClick = (event) => {
        let currTab = event.target.dataset.type;
        if (!isTransitionend.current || prevTab.current === currTab)
            return false;

        changeContent(currTab);
    };
    const changeContent = (currTab) => {
        prevTab.current = currTab;
        isTransitionend.current = false;
        setIsChanging(true);
        setCurrentTab(currTab);

        setTimeout(() => {
            isTransitionend.current = true;
            setIsChanging(false);
        }, transitionDuration);

        setTimeout(() => {
            setCurrentData(data[currTab]);
        }, halfTransitionDuration);
    };

    return [handleClick, currentData, currentTab, isChanging];
};

export default useDataChange;
