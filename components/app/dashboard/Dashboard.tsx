import React from 'react'
import Greetings from "./Greetings"
import Metrics from "./Metrics"
import Projects from "./Projects"

export default function Dashboard() {
    return (
        <React.Fragment>
            <Greetings />
            <Metrics />
            <Projects />
        </React.Fragment>
    )
}
