import React from "react";
import PowerHeader from "../../components/powermon/PowerHeader";
import PowerControls from "../../components/powermon/PowerControls";
import PowerGrid from "../../components/powermon/PowerGrid";

export default function PowerMonTab() {
    return(
        <div className="space-y-4">
            <PowerHeader/>
            <PowerControls/>
            <div className="max-w-8xl mx-auto p-1">
                <PowerGrid/>
            </div>
        </div>
    );
}