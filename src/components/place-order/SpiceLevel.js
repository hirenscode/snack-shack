import React, {useEffect, useState} from "react";

const SpiceLevel = (props) => {
    const {level} = props;
    const SPICE_LEVEL_LABELS = ["Zero Spicy", "Mild", "Spicy", "Hot", "Angry"];
    const SPICE_LEVEL_COLORS = ["2a9d8f", "e9c46a", "f4a261", "ee8959", "e76f51"];

    let [levelIndex, setLevelIndex] = useState(0);
    let [levelColor, setLevelColor] = useState({});
    let [levelLabel, setLevelLabel] = useState("");

    useEffect(() => {
        let index = Math.floor(level / (100 / SPICE_LEVEL_LABELS.length))
        setLevelIndex(index);
        setLevelColor(levelColor = {color: SPICE_LEVEL_COLORS[index]});
        setLevelLabel(SPICE_LEVEL_LABELS[index]);
    }, []);

    return <strong className="card-subtitle mb-2">
        {levelLabel}
        {[...Array(levelIndex)].map((e, i) => <i className="fa fa-pepper-hot" style={levelColor} key={i}/>)}
        </strong>
}

export default SpiceLevel;
