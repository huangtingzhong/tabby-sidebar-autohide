import { ConfigProvider } from 'tabby-core'

/** 插件配置项, 写入 Tabby config.yaml 的 sidebarAutohide 段 */
export interface SidebarAutohideConfig {
    /** 连接 SSH 后自动隐藏 better-sidebar */
    autoHideOnConnect?: boolean
}

export class SidebarAutohideConfigProvider extends ConfigProvider {
    defaults = {
        hotkeys: {
            'sidebar-autohide-toggle': ['⌘-Shift-B'],
        },
        sidebarAutohide: {
            autoHideOnConnect: true,
        } as SidebarAutohideConfig,
    }
}
