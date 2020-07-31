export const SETTINGS = {
    CURRENCY : {
        SHORT: "INR",
        LONG : "Rupees",
        SYMBOL : "₹"
    },
    GEO: {
        LOCATION: {
            LONGITUDE: 19.170018,
            LATITUDE: 72.963359
        },
        SUB_SUB_REGION: "",
        SUB_REGION: "MULUND EAST",
        CITY: "MUMBAI",
        STATE: "MAHARASHTRA",
        COUNTRY: "INDIA",
        SERVING_RADIUS: 10
    },
    ORDER: {
        DONE_ICON_CLASS: "fas fa-clipboard-check",
        STATUS: {
            1: {TEXT: "ORDER PLACED", ICON_CLASS: "fas fa-handshake"},
            2: {TEXT: "PAYMENT COMPLETED", ICON_CLASS: "fas fa-file-invoice"},
            3: {TEXT: "ORDER ACCEPTED", ICON_CLASS: "fas fa-check-square"},
            3.1: {TEXT: "ORDER DECLINED", ICON_CLASS: "fas fa-times"},
            3.5: {TEXT: "PAYMENT RETURNED", ICON_CLASS: "fas fa-undo"},
            4: {TEXT: "PREPARING ORDER", ICON_CLASS: "fas fa-hamburger"},
            5: {TEXT: "OUT FOR DELIVERY", ICON_CLASS: "fas fa-shipping-fast"},
            6: {TEXT: "DELIVERED", ICON_CLASS: "fas fa-people-carry"},
            7: {TEXT: "ASKED FOR REVIEW", ICON_CLASS: "fas fa-user-edit"},
            8: {TEXT: "REVIEWED", ICON_CLASS: "fas fa-pen"}
        },
        COMPLEX_STATUS: {
            1: "ORDER PLACED",
            2: "ORDER ACCEPTED",
            3: "ORDER DECLINED",
            4: "PAYMENT RETURNED",
            5: "ORDER CANCELLED",
            6: "ORDER REINSTATED",
            7: "PREPARING ORDER",
            8: "OUT FOR DELIVERY",
            9: "DELIVERED",
            10: "ASKED FOR REVIEW",
            11: "REVIEWED",
        },
        STATUS_FLOW: {
            HAPPY: [1, 2, 6, 7, 8],
            DECLINED: [1, 2, 3, 4],
            REINSTATE: [1, 2, 3, 4, 6, 2],
            CANCELLED: [1, 2, 3, 4, 5],
        }
    }

}
