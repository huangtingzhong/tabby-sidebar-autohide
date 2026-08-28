import { Injectable } from '@angular/core'
import { HotkeyDescription, HotkeyProvider, HotkeysService } from 'tabby-core'
import { SidebarAutohideService } from './autohide.service'

export const TOGGLE_SIDEBAR_HOTKEY = 'sidebar-autohide-toggle'

@Injectable()
export class SidebarAutohideHotkeyService {
    constructor (
        private autohide: SidebarAutohideService,
        hotkeys: HotkeysService,
    ) {
        hotkeys.hotkey$.subscribe(id => {
            if (id === TOGGLE_SIDEBAR_HOTKEY) {
                void this.autohide.toggleSidebar()
            }
        })
    }
}

export class SidebarAutohideHotkeyProvider extends HotkeyProvider {
    async provide (): Promise<HotkeyDescription[]> {
        return [{
            id: TOGGLE_SIDEBAR_HOTKEY,
            name: 'Toggle Better Sidebar (Sidebar Autohide)',
        }]
    }
}
