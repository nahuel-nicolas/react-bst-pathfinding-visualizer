import React from 'react';

const nodeOnClickContext = React.createContext({
    "nodeOnClickHandler": () => {}
});

export default nodeOnClickContext;