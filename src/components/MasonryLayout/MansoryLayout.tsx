import React from 'react';
import _ from 'lodash';

type MansoryProps = {
    columns: number;
    children: JSX.Element[];
}

const getLengthDiv = (length:number, cols:number, index:number) => {
    return _.floor(length / cols) + (index < length%cols ? 1 : 0);
}

export function MansoryLayout(props:MansoryProps) {
    const length = props.children.length;

    return (
        <div style={{display:'flex', justifyContent:"center"}}>
            {_.range(props.columns).map((colIndex => (
                <div key={colIndex}>
                    {_.range(getLengthDiv(length, 
                        props.columns, colIndex)).map(()=>(
                            props.children.pop()
                        ))}
                </div>
            )))}
        </div>
    )
} 