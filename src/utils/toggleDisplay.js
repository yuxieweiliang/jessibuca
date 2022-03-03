import {setStyle} from "./index";

export function createToggleDisplay(control, playerWidth) {
    return function toggleDisplay (elementName, width, defDisplay = 'block') {
        if (control && control[elementName]) {
            setStyle(
                control[elementName],
                'display',
                (playerWidth < width) ? 'none' : defDisplay
            )
        }
    }
}
