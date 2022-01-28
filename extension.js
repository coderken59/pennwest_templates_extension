module.exports = {
    "name": "pennwest_templates_extension",
    "publisher": "PennWest",
    "configuration": {
        "client": [],
        "server": []
    },
    "cards": [{
        "type": "TrilistCard",
        "source": "./src/cards/TrilistCard.jsx",
        "title": "Tri-List Template",
        "displayCardType": "Tri-List Template",
        "description": "List Card Template with three columns (image/icon -> short description -> link/button)",
        "customConfiguration": {
            "source": "./src/cards/TrilistConfig.jsx"
        },
        'template': {
            "image": "./src/assets/Trilist.png",
            "title": 'PennWest Tri-List'
        }
    }]
}