import React, {useEffect, useState} from "react";
import {SETTINGS} from "../../shared/Constants";

const SpiceLevel = (props) => {
    const [level, setLevel] = useState(props.level);
    let [levelColor, setLevelColor] = useState({});
    let [levelLabel, setLevelLabel] = useState("");

    useEffect(() => {
        setLevel(props.level);
        setLevelColor({color: `#${SETTINGS.MENU.SPICE_LEVEL_COLORS[props.level]}`});
        setLevelLabel(SETTINGS.MENU.SPICE_LEVEL_LABELS[props.level]);
    }, [props.level]);

    return <strong className="card-subtitle mb-2" style={levelColor}>
        {levelLabel} &nbsp;
        {[...Array(level)].map((e, i) => <i className="fa fa-pepper-hot"  key={i}/>)}
        </strong>
}

export default SpiceLevel;
