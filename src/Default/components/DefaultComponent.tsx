import { useEffect, useState } from 'react';

interface IDefaultComponentProps {
    props1: string;
    optional?: number;
    onClickListener: (event: Object) => void;
}

/**
 * Define Defulat component
 * @param DefaultComponentProps
 * @returns
 */
const DefaultComponent = ({ props1, optional, onClickListener }: IDefaultComponentProps) => {
    /* Define state value */
    const [value, setValue] = useState('init value');

    useEffect(() => {
        /**
         * call component did mount, did update when setValue called
         */
        return () => {
            /**
             * call component did unmount
             */
        };
    }, [value]);

    return (
        <div>
            Hello, {props1}, {value}
        </div>
    );
};

export default DefaultComponent;
