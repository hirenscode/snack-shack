import {SETTINGS} from "./Constants";

const salt = SETTINGS.PLATE.NMK;
const pepper = SETTINGS.PLATE.MRC;
const sauce = SETTINGS.PLATE.CTN;
export const OUR_PLATE = [
    (((salt - (((salt - sauce) / pepper) - sauce - sauce)) * pepper) * (pepper + sauce)) / pepper,
    ((salt - (sauce + sauce)) * pepper),
    ((salt - sauce) * pepper),
    ((salt * pepper - (salt / (pepper - sauce))) + sauce)];

export const PSEUDO_PLATE = [
    ((salt - (pepper * (pepper - sauce))) * pepper),
    ((salt * pepper - (salt / (pepper - sauce))) - pepper),
    (pepper * (pepper - sauce)) * (pepper * (pepper * (pepper - sauce))),
    ((salt - sauce) * pepper) - (pepper - sauce),
    ((salt * pepper - (salt / (pepper - sauce))) + sauce)];

export const checkUsersPlate = (usersPlate) => (usersPlate ? OUR_PLATE.filter((a, i) => a !== usersPlate[i]).length === 0 : false);
