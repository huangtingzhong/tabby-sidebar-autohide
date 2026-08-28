import { NgModule } from '@angular/core'
import { ConfigProvider, HotkeyProvider } from 'tabby-core'
import { SidebarAutohideService } from './autohide.service'
import { SidebarAutohideConfigProvider } from './configProvider'
import { SidebarAutohideHotkeyProvider, SidebarAutohideHotkeyService } from './hotkeys'

@NgModule({
    providers: [
        { provide: ConfigProvider, useClass: SidebarAutohideConfigProvider, multi: true },
        { provide: HotkeyProvider, useClass: SidebarAutohideHotkeyProvider, multi: true },
        SidebarAutohideService,
        SidebarAutohideHotkeyService,
    ],
})
export default class SidebarAutohideModule {
    constructor (_hotkeys: SidebarAutohideHotkeyService) {
        // eslint-disable-next-line no-console
        console.info('[tabby-sidebar-autohide] module loaded')
    }
}
