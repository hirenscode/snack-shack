import {SETTINGS} from "./Constants";

const salt = SETTINGS.UTILITY.N_A_M_A_K;
const pepper = SETTINGS.UTILITY.K_A_A_L_I__M_I_R_C_H;
const sauce = SETTINGS.UTILITY.C_H_U_T_N_E_Y;
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
