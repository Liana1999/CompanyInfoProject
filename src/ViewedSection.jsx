import React from 'react';
import { useContext } from "react"
import { ViewedContext } from "./ViewedContext"

export default function ViewedSection({onClick}) {
    const viewed = useContext(ViewedContext)
    return (
        <div className = "viewedUsersTable">
            {
                viewed.map((view) => (
                   <div><button onClick={() => onClick(view)}>{view}</button></div>
                ))
            }
        </div>
    )
}