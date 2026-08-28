import { Injectable } from '@angular/core'
import { AppService, ConfigService, PartialProfile, Profile, ProfilesService } from 'tabby-core'
import { SidebarAutohideConfig } from './configProvider'

/** 控制 better-sidebar 显隐, 并在 SSH 连接后自动隐藏 */
@Injectable()
export class SidebarAutohideService {
    private hooked = false

    constructor (
        private app: AppService,
        private config: ConfigService,
        private profiles: ProfilesService,
    ) {
        this.app.ready$.subscribe(() => this.installHook())
    }

    private installHook (): void {
        if (this.hooked) {
            return
        }
        this.hooked = true

        const original = this.profiles.launchProfile.bind(this.profiles)
        this.profiles.launchProfile = async (profile: PartialProfile<Profile>) => {
            await original(profile)
            if (this.shouldAutoHide(profile)) {
                await this.hideSidebar()
            }
        }
    }

    private pluginConfig (): SidebarAutohideConfig {
        return this.config.store.sidebarAutohide ?? {}
    }

    private shouldAutoHide (profile: PartialProfile<Profile>): boolean {
        if (this.pluginConfig().autoHideOnConnect === false) {
            return false
        }
        return profile.type === 'ssh'
    }

    private ensureSidebarPlus (): void {
        if (!this.config.store.sidebarPlus) {
            this.config.store.sidebarPlus = { enabled: true }
        }
    }

    isSidebarVisible (): boolean {
        return this.config.store.sidebarPlus?.enabled ?? true
    }

    async hideSidebar (): Promise<void> {
        this.ensureSidebarPlus()
        if (this.config.store.sidebarPlus.enabled === false) {
            return
        }
        this.config.store.sidebarPlus.enabled = false
        await this.config.save()
    }

    async showSidebar (): Promise<void> {
        this.ensureSidebarPlus()
        if (this.config.store.sidebarPlus.enabled === true) {
            return
        }
        this.config.store.sidebarPlus.enabled = true
        await this.config.save()
    }

    async toggleSidebar (): Promise<void> {
        if (this.isSidebarVisible()) {
            await this.hideSidebar()
        } else {
            await this.showSidebar()
        }
    }
}
