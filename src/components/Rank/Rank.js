import React from "react";

const Rank = ({ user }) => {
    return (
        <>
        <div className="flex justify-center white f3">
            {`${user.name}, you current rank is... `}
        </div>
        <div className="flex justify-center white f1">
            {`#${user.entries}`}
        </div>
        </>
    )
}

export default Rank