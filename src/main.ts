import {Plugin} from 'obsidian'

import {TODO_VIEW_TYPE} from './constants'
import {DEFAULT_SETTINGS, TodoSettings, TodoSettingTab} from './settings'
import TodoListView from './view'

export default class TodoPlugin extends Plugin {
  private settings: TodoSettings

  get view() {
    return this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]
      ?.view as TodoListView
  }

  async onload() {
    await this.loadSettings()

    this.addSettingTab(new TodoSettingTab(this.app, this))
    this.addCommand({
      id: 'show-checklist-view',
      name: 'Show Checklist Pane',
      callback: () => {
        const workspace = this.app.workspace
        const views = workspace.getLeavesOfType(TODO_VIEW_TYPE)
        if (views.length === 0) {
          workspace
            .getRightLeaf(false)
            .setViewState({
              type: TODO_VIEW_TYPE,
              active: true,
            })
            .then(() => {
              const todoLeaf = workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]
              workspace.revealLeaf(todoLeaf)
              workspace.setActiveLeaf(todoLeaf, true, true)
            })
        } else {
          views[0].setViewState({
            active: true,
            type: TODO_VIEW_TYPE,
          })
          workspace.revealLeaf(views[0])
          workspace.setActiveLeaf(views[0], true, true)
        }
      },
    })
    this.addCommand({
      id: 'refresh-checklist-view',
      name: 'Refresh List',
      callback: () => {
        this.view.refresh()
      },
    })
    this.registerView(TODO_VIEW_TYPE, leaf => {
      const newView = new TodoListView(leaf, this)
      return newView
    })

    if (this.app.workspace.layoutReady) this.initLeaf()
    else this.app.workspace.onLayoutReady(() => this.initLeaf())
  }

  initLeaf(): void {
    if (this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE).length) return

    this.app.workspace.getRightLeaf(false).setViewState({
      type: TODO_VIEW_TYPE,
      active: true,
    })
  }

  async onunload() {
    this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE)[0]?.detach()
  }

  async loadSettings() {
    const loadedData = await this.loadData()
    this.settings = {...DEFAULT_SETTINGS, ...loadedData}
  }

  async updateSettings(updates: Partial<TodoSettings>) {
    Object.assign(this.settings, updates)
    await this.saveData(this.settings)
    const onlyRepaintWhenChanges = [
      'autoRefresh',
      'lookAndFeel',
      '_collapsedSections',
    ]
    const onlyReGroupWhenChanges = [
      'subGroups',
      'groupBy',
      'sortDirectionGroups',
      'sortDirectionSubGroups',
      'sortDirectionItems',
    ]
    const markerVisibilitySettings = [
      'showTodo',
      'showIncomplete',
      'showDone',
      'showCanceled',
      'showForwarded',
      'showScheduling',
      'showQuestion',
      'showImportant',
      'showStar',
      'showQuote',
      'showLocation',
      'showBookmark',
      'showInformation',
      'showSavings',
      'showIdea',
      'showPros',
      'showCons',
      'showFire',
      'showKey',
      'showWin',
      'showUp',
      'showDown',
      'showChecked',  // Keep for backward compatibility
    ]

    const updatedKey = Object.keys(updates)[0]

    if (onlyRepaintWhenChanges.includes(updatedKey))
      this.view.rerender()
    else if (markerVisibilitySettings.includes(updatedKey))
      this.view.refresh(true)  // Full refresh for marker visibility changes
    else
      this.view.refresh(
        !onlyReGroupWhenChanges.includes(updatedKey),
      )
  }

  getSettingValue<K extends keyof TodoSettings>(setting: K): TodoSettings[K] {
    return this.settings[setting]
  }
}
