import React, {useEffect, useState} from "react";

const SpiceLevel = (props) => {
    const {level} = props;
    const SPICE_LEVEL_LABELS = ["Zero Spicy", "Mild", "Spicy", "Hot", "Angry"];
    const SPICE_LEVEL_COLORS = ["008f00", "b05000", "c04000", "e02000", "ff0000"];

    let [levelIndex, setLevelIndex] = useState(0);
    let [levelColor, setLevelColor] = useState({});
    let [levelLabel, setLevelLabel] = useState("");

    useEffect(() => {
        let index = Math.floor(level / (100 / SPICE_LEVEL_LABELS.length))
        setLevelIndex(index);
        let colorStyle = {color: `#${SPICE_LEVEL_COLORS[index]}`};
        setLevelColor(colorStyle);
        setLevelLabel(SPICE_LEVEL_LABELS[index]);
    }, []);

    return <strong className="card-subtitle mb-2" style={levelColor}>
        {levelLabel} &nbsp;
        {[...Array(levelIndex)].map((e, i) => <i className="fa fa-pepper-hot"  key={i}/>)}
        </strong>
}

export default SpiceLevel;
