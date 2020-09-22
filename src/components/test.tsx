import React from "react";

type Props = {
    // text: string;
    name: string
}

const Test: React.FC<Props> = ({ name }) => (
    <div>
        <p>hello {name}</p>
    </div>
);

export default Test