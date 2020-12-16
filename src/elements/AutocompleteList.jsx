import React, {Component} from 'react';

class AutocompleteList extends Component {
    render() {
        if (!this.props.items.length) {
            return null;
        }
        return (
            <ul className="autocomplete">
                {this.props.items.map((item, index) => {
                    let liItem = item.title;
                    if (item.isBold) {
                        liItem = <strong style={{fontSize: "110%"}}>{item.title}</strong>;
                    }
                    return (
                    <li className="autocomplete-item"
                        key={index}
                        onClick={(e) => {
                            console.log('item clicked!');
                            e.preventDefault();
                            this.props.onChange(item);
                        }}
                    >
                    {liItem}
                    </li>
                    );
                })}
            </ul>
        )
    }
};

export default AutocompleteList;
