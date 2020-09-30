export const SETTINGS = {
    APP: {
        NAME: "Snack Shack",
        SUBTITLE: "Happiness is Homemade",
        LOGO: "https://firebasestorage.googleapis.com/v0/b/snack-shack-test.appspot.com/o/images%2Flogo.png?alt=media&token=696c0cad-d1b6-4bc3-97e8-36e1550babb3",
        FAVICON: "https://firebasestorage.googleapis.com/v0/b/snack-shack-test.appspot.com/o/images%2Ffavicon.ico?alt=media&token=cc84fc91-49a5-4dd0-8704-6ce1da2642d5"
    },
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
        SERVING_RADIUS: 10,
        LOCALE: "en-IN"
    },
    ORDER: {
        DONE_ICON_CLASS: "fas fa-clipboard-check",
        STATUS: {
            0: {TEXT: "CAN'T REVERT", ICON_CLASS: "fas fa-handshake"},
            1: {TEXT: "ORDER PLACED", ICON_CLASS: "fas fa-handshake"},
            2: {TEXT: "PAY DONE", ICON_CLASS: "fas fa-file-invoice"},
            3: {TEXT: "ACCEPTED", ICON_CLASS: "fas fa-check-square"},
            4: {TEXT: "DECLINED", ICON_CLASS: "fas fa-times"},
            5: {TEXT: "RETURNED", ICON_CLASS: "fas fa-undo"},
            6: {TEXT: "PREPARING", ICON_CLASS: "fas fa-hamburger"},
            7: {TEXT: "OUT FOR DELIVERY", ICON_CLASS: "fas fa-shipping-fast"},
            8: {TEXT: "DELIVERED", ICON_CLASS: "fas fa-people-carry"},
            9: {TEXT: "GET REVIEW", ICON_CLASS: "fas fa-user-edit"},
            10: {TEXT: "REVIEWED", ICON_CLASS: "fas fa-pen"},
            11: {TEXT: "ARCHIVE", ICON_CLASS: "fas fa-pen"},
            100: {TEXT: "COMPLETED", ICON_CLASS: "fas fa-pen"}
        },
        STATUS_FLOW: {
            1: [3, 4],
            3: [4, 6],
            4: [5, 11],
            5: [100],
            6: [7],
            7: [8],
            // 8: [9],
            8: [11],
            9: [10],
            10: [11],
            11: [100],
            100: [100]
        },
        REVERT_FLOW: {
            1: [0],
            3: [1],
            4: [1, 3],
            5: [4],
            6: [3],
            7: [6],
            8: [7],
            9: [8],
            10: [9],
            //11: [10],
            11: [8]
        }
    },
    MENU: {
        SPICE_LEVEL_LABELS: ["Zero Spicy", "Mild", "Spicy", "Hot", "Burning Hot"],
        SPICE_LEVEL_COLORS: ["008f00", "b05000", "c04000", "e02000", "ff0000"],
        PREPARING_IMAGE: "https://firebasestorage.googleapis.com/v0/b/snack-shack-test.appspot.com/o/images%2Fpreparing-menu%2FPreparing1.jpg?alt=media&token=d7e570a2-4665-4ad8-9362-4c3c0a6bf413",
        DEFAULT_MENU_IMAGE: "https://firebasestorage.googleapis.com/v0/b/snack-shack-test.appspot.com/o/images%2Fmenu-item%2Fdefault_menu_item.png?alt=media&token=7a617d25-b6f2-4943-bbc4-e180c87b36c0"
    },
    PLATE: {
        NMK: 40,
        MRC: 3,
        CTN: 1
    }

}
