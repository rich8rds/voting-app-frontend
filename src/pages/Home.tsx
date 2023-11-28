//import React from "react"

import { Link } from "react-router-dom"

function Home(): JSX.Element {
    return (
        <div style={{
            height: "100vh", display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            border: "1px solid red",
            background: "#f0fffb",
            color: "white",
        }}>
            <div className="min-div" style={{
                width: "40vw", 
                display: "flex",
                height: "260px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "40px",
            }}>
                <h3>HELLO TO MY VOTING APP!!! SUCCESSS </h3>
                <p>Welcome to contestants voting</p>

                <div className="container" style={{ padding: "40px 100px", display: "flex", gap: "10px" }}>
                    <Link to={"/votes"}>Votes</Link>
                    <Link to={"/register"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Home