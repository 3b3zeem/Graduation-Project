import React, { useState } from "react";
import "./ADDetails.css";
import { Container } from "@mui/material";
import Gallery from "./Gallery";
import Description from "./Description";
import MobileGallery from "./MobileGallery";

function ADDetails() {
    const [quant, setQuant] = useState(0);

    const addQuant = () => {
        setQuant(quant + 1);
    };

    const removeQuant = () => {
        setQuant(quant - 1);
    };

    const resetQuant = () => {
        setQuant(0);
    };
    return (
        <main className="App">
            <Container component="section" maxWidth={"lg"}>
                <section className="core">
                    <Gallery />
                    <MobileGallery />
                    <Description
                        onQuant={quant}
                        onAdd={addQuant}
                        onRemove={removeQuant}
                    />
                </section>
            </Container>
        </main>
    );
}

export default ADDetails;
