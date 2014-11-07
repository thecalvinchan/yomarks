// SAMPLE
this.manifest = {
    "name": "My Extension",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "username",
            "type": "text",
            "label": i18n.get("username"),
            "text": i18n.get("x-characters")
        }
    ],
    "alignment": [
        [
            "username"
        ]
    ]
};
