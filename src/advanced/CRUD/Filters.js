export class SimpleFilter {
    constructor(name, label) {
        this.type = 'simple'
        this.name = name
        this.label = label
    }

    getOptions(items) {
        return items
            .map(item => item[this.name])
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .map(item => {
                return {
                    label: item,
                    value: item
                }
            })
    }

    apply(items, value) {
        if(value === null) {
            return items
        }

        return items.filter(item => item[this.name] == value)
    }
}

export class ToggleFilter {
    constructor(name, label) {
        this.type = 'toggle'
        this.name = name
        this.label = label
    }

    apply(items, value) {
        if(value === null) {
            return items
        }

        return items.filter(item => item[this.name] == value)
    }
}

export class NestedFilter {    
    constructor(name, label, optionLabel = 'name', optionValue = 'id') {
        this.type = 'nested'
        this.name = name
        this.label = label
        this.optionLabel = optionLabel
        this.optionValue = optionValue
    }

    getOptions(items) {
        if(items.length == 0) {
            return items
        }

        let ids = new Set()
        items.forEach(item => {
            if(item[this.name]) {
                ids.add(item[this.name][this.optionValue])
            }
        })

        let options = [...ids].map(id => {
            return items.find(item => {
                return item[this.name] && item[this.name][this.optionValue] == id
            })[this.name]
        })

        options.sort((a, b) => {
            return b[this.optionLabel] - a[this.optionLabel]
        })

        return options
    }

    apply(items, value) {
        if(!value) {
            return items
        }

        return items.filter(item => {
            return item[this.name] && item[this.name][this.optionValue] == value
        })
    }
}