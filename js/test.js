import {fileData as data, fileData, overviewBtns } from './appendData.js'
import { displayOverviewWindow } from './fetchdata.js';
let btnUpdated = false;


document.querySelector("body").addEventListener("click", () => {
    update()
})

function update() {
    if (overviewBtns != []) {
        if (!btnUpdated) {
            btnUpdated = true;
            overviewBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    displayOverviewWindow(btn, fileData)
                })
            })
        }

    }
}
