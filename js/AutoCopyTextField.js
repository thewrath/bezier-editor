'use strict';

import { TextField } from 'black-engine';

export class AutoCopyTextField extends TextField {
    onAdded() {
        this.on('pointerDown', this.onPointerDown, this);
    }

    async onPointerDown() {
        try {
            // In case of chromium based we need a permission
            await navigator.permissions.query({name: "clipboard-write"});
        } catch (e) {
            // Firefox throw if we ask permission
        } finally {
            // In all case we try to write (Firefox always throw with this code)
            navigator.clipboard.writeText(this.text).then();
        }
    }
}